/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description: Post - 合同
 *
 * =====================  以下内容每份合同必须带上  ==============================
 * Post是由各资源Manager负责创建和发布的认领信息，由PostManager负责管理和维护
 * Post记录一份工作的相关信息并决定哪些是需要存档在Memory中的
 * Post有固有字段和特有字段，即不同的工作除了基本信息外会有各自需要记录的信息
 * 特有字段必须是字面量，以便于扁平化处理
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
	id: number;
	postType: string;
	poster: string[] | Creep[];
	posterId: string[];
	target: string[] | any[];
	targetId: string[];
	bodyNeed: BodyPartConstant | BodyPartConstant[];
	/**
	 * @param {string} postType 合同类型，合同名称
	 * @param {string[] | Creep[] | StructureTower[]} poster 合同执行者id，可以是多个一起签署
	 * @param {string[] | any[]} target 合同执行目标id，可以有多个目标对象
	 * @param {BodyPartConstant[]} bodyNeed 合同执行目标id，可以有多个目标对象
	 */
	constructor(
		postType: string,
		poster: string[] | Creep[],
		target: string[] | any[],
		bodyNeed: BodyPartConstant | BodyPartConstant[],
	) {
		this.id = new Date().getTime();
		this.postType = postType;
		this.poster = poster;
		this.target = target;
		this.bodyNeed = bodyNeed;
		this.checkParam(this.poster, 'poster');
		this.checkParam(this.target, 'target');
	}

	/**
	 * 检查entry参数是否合法
	 * 如果entry是String数组则转换为对象数组
	 * @param {string[] | any[]} entry
	 * @param {string} coverName 最后覆盖的参数名，会将转换后的对象数组覆盖到this[cover]
	 */
	checkParam(entry: string[] | Creep[] | StructureTower[], coverName: string) {
		if (entry instanceof Array && entry.length > 0 && _.isString(entry[0])) {
			const objectArray: any[] = [];
			const idArray: string[] = [];
			_.forEach(entry, (p, index) => {
				/**
				 * 如果传入的是id
				 * 则检查合同对象是否还存在
				 */
				if (_.isString(p)) {
					const e = Game.getObjectById(p);
					if (!e)
						entry.splice(Number(index), 1); // 不存在了，则从id列表中删除
					else objectArray.push(e);
				}
			});
			this[coverName] = objectArray;
			this[coverName + 'Id'] = idArray;
		}
	}

	/**
	 * 输出扁平化的合同对象
	 */
	print() {
		const { id, postType, posterId, targetId, bodyNeed } = this;
		return { id, postType, posterId, targetId, bodyNeed };
	}
}
