/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description: Post - 合同
 *
 * ============================================================================
 * Post是由各资源/设施Manager负责创建和发布的认领信息，由PostManager负责管理和维护
 * Post记录一份工作的相关信息并决定哪些是需要存档在Memory中的
 * Post有固有字段和特有字段，即不同的工作除了基本信息外会有各自需要记录的信息
 * ---------------------------- 任务 -------------------------------------------
 * Post包含（多个）任务，以及任务的具体流程，如采集任务和运输任务
 * Post中的任务拥有执行优先级，也会判断任务是否需要更改优先级，是否需要转换状态，是否需要执行
 * Post中每个独立的任务本身会涉及多个状态，但一名执行者对于一个任务同时只能拥有一个状态
 * 即一名执行者的一个合同可能包含多个任务，可以同时拥有这多个任务分别对应的不同状态
 * Post中每个任务都有“状态转换函数”，意味着每个任务都拥有退出和进入的条件（也可以没有，即退出=新一轮的开始）
 * -----------------------------------------------------------------------------
 * 每个任务都需要以下几个属性/方法使得creep知道如何执行该任务
 * 1.状态机
 * 2.上一个状态，包含状态名和Game.time
 * 3.当前状态名
 * ---------------------------- 状态机 ------------------------------------------
 * 状态机是一个描述一个状态下的各种操作的对象，每种任务拥有各自不同的状态机，它包含以下内容:
 * 1.状态初始化方法: 如果没有在状态寄存器中找到有关的状态的话，就需要将初始化以便能够使用状态转换函数
 * 2.状态机执行方法: 对当前状态进行处理，会依次处理当前状态的before，do和after方法(也可能跳过do和after)
 * 3.状态转换函数: 用于判断是否需要转换状态，转换后可以立即执行状态字典中的相关方法
 * 4.状态字典，它的结构如下:
 * {
 *      [状态名]: {
 *          before: 处在该状态时，在执行该状态对应的具体操作前执行的方法，可用于临时改变状态或其他操作
 *          do: 该状态对应的具体操作
 *          after: 具体操作执行后的后置方法，有时候需要在执行后判断是否要结束任务或者转换新的状态
 *      }
 * }
 * ---------------------------- 字段说明 ----------------------------------------
 * 合同信息包括县不限于一下内容:
 * poster         合同签署人，执行者，可以是多个单位
 * posterId       合同签署人id列表，用于存档和恢复运行时环境
 * target         合同内容涉及到的任务目标，可以是多个单位
 * targetId       任务目标id列表，用于存档和恢复运行时环境
 * postType       合同种类，合同名称，用以区分不同工作内容的合同
 * !bodyNeed      签署这个合同至少需要什么“种类”的部件，注意是种类，不需要标注数量
 * status         表示合同信息完成度
 * options        不同合同需要附加的特殊字段，必须是字面量或者属性是字面量的对象
 * ----------------------------------------------------------------------------
 * status: 合同信息完成度,分为一下几种:
 * 1.'normal'     参数正常的合同，既有执行者，又有目标
 * 2.'noPoster'   执行者丢失的合同，需要添加执行者，目标已经确定
 * 3.'noTarget'   目标丢失的合同，需要添加目标，但是执行者已经确定
 * 4.'empty'      仅仅知道合同类型，执行者和目标均没有指定的空合同
 * ----------------------------------------------------------------------------
 * CreepManager检查出没有任何工作的creep，这些过滤出来的creep将分别认领这些工作合同
 * 认领完，如果人多，则回收，如果人少则将剩下的job合同递交给spawn生产需要的creep
 * ============================================================================
 */
import * as _ from 'lodash';

/**
 * 合同的产生情况分为两种
 * 1.运行时检查出需要创建新的工作合，使用对象数据创建
 * 2.运行时环境使用Memory数据初始化时创建合同，使用对象id创建
 * 所以在初始化的时候需要对参数做一遍校验处理，方便后续对合同的操作
 */
export class Post {
    /**
     * 合同第一次实例化的事件，精确到毫秒
     */
    id: number;
    postType: string;
    poster: string[] | Creep[];
    posterId: string[];
    target: string[] | any[];
    targetId: string[];
    /**
     * 签署这个合同至少需要什么“种类”的部件，注意是种类，不需要标注数量
     */
    bodyNeed: BodyPartConstant | BodyPartConstant[];
    /**
     * 表示合同信息完成度
     */
    status: string;
    /**
     * 额外的配置，仅限字面量或字面量属性值的对象
     */
    options: object;
    /**
     * 该合同的实例内涉及到的对象或参数是否已经初始化完毕
     * 如将id列表转化为实例列表
     */
    hasInit: boolean = false;
	/**
	 * @param {string} postType 合同类型，合同名称
	 * @param {string[] | Creep[] | StructureTower[]} poster 合同执行者，可以是多个一起签署
	 * @param {string[] | any[]} target 合同执行目标，可以有多个目标对象
	 * @param {BodyPartConstant[]} bodyNeed 签署这个合同至少需要什么“种类”的部件，注意是种类，不需要标注数量
	 * @param {object} options 额外的配置，仅限字面量或字面量属性值的对象
	 */
    constructor(
        postType: string,
        poster: string[] | Creep[],
        target: string[] | any[],
        bodyNeed: BodyPartConstant | BodyPartConstant[],
        options?: object,
        id?: number,
    ) {
        this.id = id || new Date().getTime();
        this.postType = postType;
        this.poster = poster;
        this.target = target;
        this.bodyNeed = bodyNeed;
        this.options = options || {};
        this.checkParam(this.poster, 'poster');
        this.checkParam(this.target, 'target');
    }

    init() {
        this.hasInit = true;
    }

    /**
	 * 输出扁平化的合同对象
	 */
    
    get raw() {
        const { id, postType, posterId, targetId, bodyNeed, options } = this;
        return { id, postType, posterId, targetId, bodyNeed, options };
    }

	/**
	 * 检查entry参数是否合法
	 * 如果entry是String数组则转换为对象数组
	 * @param {string[] | any[]} entry
	 * @param {string} coverName 最后覆盖的参数名，会将转换后的对象数组覆盖到this[cover]
	 */
    checkParam(entry: string[] | Creep[] | StructureTower[], coverName: string) {
        let objectArray: any[] = [];
        let idArray: any[] = [];
        if (_.isArray(entry) && entry.length > 0) {
            if (_.isString(entry[0])) {
                _.forEach(entry, (p, index) => {
                    /**
                     * 如果传入的是id
                     * 则检查合同对象是否还存在
                     */
                    if (_.isString(p)) {
                        const e = Game.getObjectById(p);
                        if (!e) entry.splice(Number(index), 1); // 不存在了，则从id列表中删除
                        else objectArray.push(e);
                    }
                });
                idArray = entry;
            } else {
                objectArray = entry;
                _.forEach(<Creep[] | StructureTower[]>entry, (p: Creep | StructureTower) => {
                    if (!_.isString(p)) idArray.push(p.id);
                });
            }
            this[coverName] = objectArray;
            this[coverName + 'Id'] = idArray;
        }
    }


    /**
     * 获取合同状态（类型）
     * 合同分为一下几种:
     * 1.'normal'     参数正常的合同，既有执行者，又有目标
     * 2.'noPoster'   执行者丢失的合同，需要添加执行者，目标已经确定
     * 3.'noTarget'   目标丢失的合同，需要添加目标，但是执行者已经确定
     * 4.'empty'      仅仅知道合同类型，执行者和目标均没有指定的空合同
     * 
     * @param post 
     */
    // getPostType() {
    //     if (!this.poster) {
    //         if (!this.target) return 'empty';
    //         else return 'noPoster';
    //     } else if (!this.target) return 'noTarget';
    //     else return 'normal';
    // }
}
