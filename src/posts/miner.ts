/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description: MinerPost - 矿工合同
 * ============================ 矿工合同说明 ====================================
 * 任务状态:采集(hervest), 移动至容器(moveToContainer), 移动至矿点(moveToSource), 放置(transfer)
 * 涉及对象: 矿点对象, Creep, 容器对象
 * 状态判断条件:到达矿点状态, 背包满状态, 到达容器状态, 背包空状态
 * 输入:当前状态, 中间变量:背包是否满, 输出: 下一刻状态
 * 到达矿点状态->开始执行采集任务->背包满状态->开始执行移动至容器任务->
 * 到达容器状态->开始执行放置任务->背包空状态->开始执行移动至矿点任务->到达矿点状态
 * 
 * 状态寄存器: {
 * 		target: {
 * 			'source1's id': rest energy,
 * 		},
 * 		poster: {
 * 			'poster1's id': {
 * 				energy
 * 			},
 * 		},
 * }
 * ============================================================================
 */
import * as _ from 'lodash';
import { Post } from './Post';

/**
 * 矿工合同
 * 该工作内容包含：采集(heavest)，搬运(transfer)
 */
export class MinerPost extends Post {

	/**
	 * @param {string[]|any[]} poster 矿工
	 * @param {string[]|any[]} target 资源source
	 */
	constructor(poster: string[] | Creep[], target: string[] | Source[]) {
		super('miner', poster, target, [MOVE, WORK, CARRY]);
		this.options = _.assign(this.options, {
			poster: this.posterId,
			container: null,
			target: this.targetId,
		});
		this.init();
	}

	/**
	 * creep中保存的的post数据结构
	 * posts: {
	 * 		[post.id]: {
	 * 			status:,
	 * 			* 以下是该post特有的参数
	 * 			poster:,
	 * 			container:,
	 * 			target:,
	 * 			path:,
	 * 		}
	 * }
	 */

	/**
	 * 状态机执行方法
	 */
	launch() {
		const that = this;
		_.map(this.poster as Creep[], (creep: Creep) => {
			const postMemory = that.initStatus(creep);
			const statusObject = that.dictionary[postMemory.status];
			if (statusObject) {
				if (statusObject.before instanceof Function) statusObject.before(creep);
			} else Log.error('错误的状态');
		});
	}

	/**
	 * Post 的一次性初始化
	 */
	init() {
		if (this.hasInit) return;
		this.hasInit = true;
		const that = this;
		if (this.poster && this.poster.length > 0) {
			_.map(this.poster as Creep[], (creep: Creep) => {
				that.initStatus(creep);
				that.initCreeps(creep);
			});
		}
	}

	/**
	 * 每个creep的posts内对应该本合同的配置对象都存储了相关的id
	 * 本函数将这些id实例化到运行时环境
	 */
	initCreeps(creep: Creep) {
		const memoryPost = creep.memory.posts[this.id];
		if (!creep.posts[this.id]) creep.posts[this.id] = {};
		if (_.isString(memoryPost.container)) {
			creep.posts[this.id]['container'] = Game.getObjectById(memoryPost.container);
		}
		if (_.isString(memoryPost.target)) {
			creep.posts[this.id]['target'] = Game.getObjectById(memoryPost.target);
		}
	}

	/**
	 * 状态初始化方法
	 * 检查现在处于哪个状态
	 * 初始化原则: 背包清空后再前往矿点
	 * 同时需要初始化container对象，动态查找一个最近的进行绑定，满了之后再找另一个没满的
	 */
	initStatus(creep: Creep): any {
		const postMemory = creep.memory.posts[this.id];
		if (postMemory && !postMemory.status) { // creep拥有签署了该合同 且 没有初始化状态
			// 设置status
			postMemory.status = _.sum(creep.carry as any) > 0 ? 'moveToContainer' : 'moveToSource';
			// 判断是否已经分配合适的container
			if (postMemory.container) { // 已经分配有container
				const container = Game.getObjectById(postMemory.container) as any;
				if (container && (
					(container.energy && container.energy < container.energyCapacity)) ||
					(container.store && _.sum(container.store) < container.storeCapacity)) {
					return;
				}
			}
			// 分配可用的container
			postMemory.container = this.initContainer(this.target[0] as Source);
		}
		return postMemory;
	}

	/**
	 * 
	 */
	initContainer(source: Source) {
		// const sourc
		let container;
		// 找最近的房间，从资源点所在房间开始找起
		let room = source.room;
		container = this.findContainerInRoom(room);

		// 去附近的房间查找
		if (!container) {
			// room = 
			let l: number | undefined;
			const roomList = Object.keys(Game.rooms);
			while (!container || roomList.length > 0) {
				const roomName = roomList.shift() as string;
				const tempRoom = Game.rooms[roomName];
				if (tempRoom.name !== source.room.name) {
					const lt = Game.map.getRoomLinearDistance(tempRoom.name, source.room.name);
					if (!l || lt < l) {
						l = lt;
						room = tempRoom;
					}
				}
				container = this.findContainerInRoom(room);
			}
		}
		if (!container) Log.error('我次奥为什么找不到可以用的容器啊！');
		return container;
	}

	/**
	 * 在指定房间内查找可以存放source energy的容器
	 * 优先级为: container, spawn, extension, storage
	 * 
	 * @param room
	 */
	findContainerInRoom(room: Room) {
		// container
		let container;
		if (room.container.length > 0) {
			_.forEach(room.container, (container: StructureContainer) => {
				if (_.sum(container.store as any) < container.storeCapacity) {
					container = container;
					return false;
				}
			})
		}
		// spawn
		if (!container) {
			_.forEach(room.mySpawn, (spawn: StructureSpawn) => {
				if (spawn.energy < spawn.energyCapacity) {
					container = spawn;
					return false;
				}
			});
		}
		// extension
		if (!container) {
			_.forEach(room.myExtension, (extension: StructureExtension) => {
				if (extension.energy < extension.energyCapacity) {
					container = extension;
					return false;
				}
			});
		}
		// storage
		if (!container && room.storage) {
			if (_.sum(room.storage.store as any) < room.storage.storeCapacity) {
				container = room.storage;
			}
		}
		return container;
	}

	/**
	 * 状态字典
	 */
	dictionary: object = {
		moveToSource: { // 移动到矿点
			before: (creep: Creep) => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				/**
				 * 判断背包是否为空
				 * 不为空则转换到moveToContainer状态
				 */
				if (_.sum(creep.carry as any) > 0) {
					postMemory.status = 'moveToContainer';
					postData.status = 'moveToContainer';
					this.dictionary[postData.status].before(creep);
					return;
				}
				/**
				 * 前往的矿点是否还有资源
				 * 已枯竭则更换资源点
				 * !暂时跳过该步骤，等在矿点旁边
				 */
				if (postData.target.energy === 0) {
					Log.error('需要更换资源点');
				}

				/**
				 * 是否已经到达矿点
				 * 到达则转换到hervest状态
				 */
				if (creep.pos.isNearTo(postData.target)) {
					postMemory.status = 'hervest';
					postData.status = 'hervest';
					this.dictionary[postData.status].before(creep);
					return;
				}
				this.dictionary[postData.status].do(creep);
			},
			do: (creep: Creep) => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				/**
				 * 前往矿点
				 * 是否有可用的path
				 */
				/**
				 * 优先判断是否有临时路径
				 * 临时路径一般为不是用固定路径时的临时构建的路径，
				 */
				let totalPath: any = postMemory.tempPath;
				let index: number;
				if (!totalPath) { // 不存在临时路径
					const searchPath = PathManager.find(postData.container.id, postData.target.id);
					totalPath = searchPath.path;
					index = searchPath.index;
					if (!totalPath) { // 路径库中没有找到可用的路径，创建一条新的
						totalPath = creep.room.findPath(postData.container.pos, postData.target.pos);
						PathManager.add(postData.container.id, postData.target.id, totalPath.path);
						index = PathManager.entries.length;
					}
					postMemory.pathIndex = index;
				}
				
				const moveRes = creep.moveByPath(totalPath);
				/**
				 * 不在固定路径上，创建临时路径
				 */
				if (moveRes === ERR_NOT_FOUND) {
					totalPath = creep.room.findPath(creep.pos, postData.target.pos);
					postMemory.tempPath = totalPath;
					creep.moveByPath(totalPath); // 沿临时路径移动
				}
			},
		},
		moveToContainer: { // 移动至容器
			before: () => {
				/**
				 * 判断背包是否已经清空
				 * 空了则转换到moveToSource状态
				 */

				/**
				 * 前往的容器是否已满
				 * 满了则更换容器
				 */

				/**
			   * 是否已经到达容器
			   * 到达则转换到transfer状态
			   */
			},
			do: () => {
				// 前往容器
			},
		},
		transfer: { // 放置
			before: () => {
				/**
				 * 判断背包是否已经清空
				 * 空了则转换到moveToSource状态
				 */

				/**
				  * 前往的容器是否已满
				  * 满了则更换容器
				  */
			},
			do: () => {
				// 放置
			},
		},
		hervest: { // 采集
			before: () => {

				/**
				 * 判断背包是否已满
				 * 满了则切换到moveToContainer状态
				 */

				/**
				 * 前往的矿点是否还有资源
				 * 已枯竭则更换资源点
				 */
			},
			do: () => {
				// 采集
			},
		},
	};

	/**
	 * 状态转换方法
	 */
	convert() {

	}

}
