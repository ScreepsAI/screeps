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
 * status         合同状态
 * options        不同合同需要附加的特殊字段，必须是字面量或者属性是字面量的对象
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
	id;
	postType;
	entries;
	entriesName;
	entriesId;
	/**
	 * 签署这个合同至少需要什么“种类”的部件，注意是种类，不需要标注数量
	 */
	bodyNeed;
	/**
	 * 合同状态
	 */
	status;
	/**
	 * 额外的配置，仅限字面量或字面量属性值的对象
	 */
	options;
	/**
	 * 该合同的实例内涉及到的对象或参数是否已经初始化完毕
	 * 如将id列表转化为实例列表
	 */
	hasInit = false;

	/**
	 * @param {string} postType 合同类型，合同名称
	 * @param {any|undefined} entries
	 * @param {any|undefined} entriesId
	 * @param {any|undefined} entriesName
	 * @param {BodyPartConstant[]} bodyNeed 签署这个合同至少需要什么“种类”的部件，注意是种类，不需要标注数量
	 * @param {object} options 额外的配置，仅限字面量或字面量属性值的对象
	 */
	constructor({ postType, entries, entriesId, entriesName, bodyNeed, options, id, status }) {
		this.id = id || `post-${new Date().getTime()}`;
		this.postType = postType;
		this.entries = entries || {};
		this.entriesId = entriesId || {};
		this.entriesName = entriesName || {};
		this.bodyNeed = bodyNeed || [];
		this.options = options || {};
		this.status = status || 0;
		/**
		 * 初始化参数
		 * 传入实例则填补name和id，没有name则只填id
		 * 传入id则实例化并获取name，没有则忽略
		 * 传入name则实例化并获取id，没有则忽略
		 */
		this.checkEntries();
		this.checkEntriesName();
		this.checkEntriesId();
		// console.log(this.entries);
		// console.log(JSON.stringify(this.entriesName));
		// console.log(JSON.stringify(this.entriesId));
	}

	get memory() {
		return PostManager.memory.entries[this.id];
	}

	init() {
		this.hasInit = true;
	}

	/**
	 * 合同的处理函数
	 */
	launch() {
		Log.success(`Post ${this.postType} is Launch!`);
	}

	/**
	 * 输出扁平化的合同对象
	 */

	get raw() {
		const { id, postType, entriesId, entriesName, bodyNeed, options, status } = this;
		return { id, postType, entriesId, entriesName, bodyNeed, options, status };
	}

	/**
	 * 根据实例检查id和name字典映射是否正确
	 */
	checkEntries() {
		if (this.entries) {
			// 拥有实例时
			const that = this;
			_.forEach(this.entries, (kind, kindName) => {
				_.forEach(kind, entry => {
					// 判断实例是否有name
					const entryName = entry['name'];
					if (entryName) {
						if (!that.entriesName[kindName]) that.entriesName[kindName] = [];
						if (!_.includes(that.entriesName[kindName], entryName)) {
							that.entriesName[kindName].push(entryName);
						}
					}
					// 判断实例是否有id
					const entryId = entry['id'];
					if (entryId) {
						if (!that.entriesId[kindName]) that.entriesId[kindName] = [];
						if (!_.includes(that.entriesId[kindName], entryId)) {
							that.entriesId[kindName].push(entryId);
						}
					}
				});
			});
		} else false;
	}

	/**
	 * 根据name实例化，校验并补全id字典
	 */
	checkEntriesName() {
		if (this.entriesName) {
			_.forEach(this.entriesName, (names, kindName) => {
				_.forEach(names, name => {
					// 检查是否有对应的实例
					const entry = Game.creeps[name] || Game.spawns[name] || Game.rooms[name] || global[name];
					if (entry) {
						if (!this.entries[kindName]) this.entries[kindName] = {};
						if (!this.entries[kindName][name]) this.entries[kindName][name] = entry; // 添加名称和实例的映射关系
						// // 检查实例是否有id, 有则添加映射关系
						// const entryId = entry['id'];
						// if (entryId && !_.includes(this.entries[kindName], entryId)) {
						//     if (!this.entries[kindName][entryId]) this.entries[kindName][entryId] = entry; // 添加id和实例的映射关系
						//     if (!this.entriesId[kindName]) this.entriesId[kindName] = [];
						//     if (!_.includes(this.entriesId[kindName], entryId)) this.entriesId[kindName].push(entryId);
						// }
					}
				});
			});
		}
	}

	/**
	 * 根据id实例化，校验并补全name字典
	 */
	checkEntriesId() {
		if (this.entriesId) {
			_.forEach(this.entriesId, (ids, kindName) => {
				_.forEach(ids, id => {
					// 检查是否有对应的实例
					const entry = Game.getObjectById(id);
					if (entry) {
						// 检查实例是否有id, 有则添加映射关系
						const entryName = entry['name'];
						if (entryName && !_.includes(this.entries[kindName], entryName)) {
							if (!this.entries[kindName][entryName]) this.entries[kindName][entryName] = entry; // 添加name和实例的映射关系
							if (!this.entriesName[kindName]) this.entriesName[kindName] = [];
							if (!_.includes(this.entriesName[kindName], entryName))
								this.entriesName[kindName].push(entryName);
						} else {
							if (!this.entries[kindName]) this.entries[kindName] = {};
							if (!this.entries[kindName][id]) this.entries[kindName][id] = entry; // 添加id和实例的映射关系
						}
					}
				});
			});
		}
	}

	/**
	 * 设置post状态
	 */
	setStatus(n) {
		this.status = n;
		this.memory.status = n;
	}

	addEntry(entry, kind) {
		if (entry) {
			if (!this.entries[kind]) this.entries[kind] = {};
			if (entry.name) this.entries[kind][entry.name] = entry;
			else if (entry.id) this.entries[kind][entry.id] = entry;

			if (entry.name || entry.managerName) {
				if (!this.entriesName[kind]) this.entriesName[kind] = [];
				if (!this.memory.entriesName) this.memory.entriesName = {};
				if (!this.memory.entriesName[kind]) this.memory.entriesName[kind] = [];
				this.entriesName[kind].push(entry.name);
				this.memory.entriesName[kind].push(entry.name);
			}
			if (entry.id) {
				if (!this.entriesId[kind]) this.entriesId[kind] = [];
				if (!this.memory.entriesId) this.memory.entriesId = {};
				if (!this.memory.entriesId[kind]) this.memory.entriesId[kind] = [];
				this.entriesId[kind].push(entry.id);
				this.memory.entriesId[kind].push(entry.id);
			}
		} else throw new Error('添加的对象不存在!');
	}
}
