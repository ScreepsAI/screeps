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
import { Post } from '../Post';

/**
 * 矿工合同
 * 该工作内容包含：采集(heavest)，搬运(transfer)
 */
export class MinerPost extends Post {
	/**
	 * @param {any} entries
	 * @param {any} entriesName
	 * @param {any} entriesId
	 */
	constructor({ id, entries, entriesId, entriesName, status }) {
		super({
			id: id,
			postType: 'miner',
			entries: entries,
			entriesId: entriesId,
			entriesName: entriesName,
			bodyNeed: [MOVE, WORK, CARRY],
			status: status,
		});
		this.options = _.assign(this.options, {
			creepMemory: {
				posts: {
					[this.id]: {
						container: null,
						sources: this.entriesId['sources'],
						path: null,
					},
				},
			},
		});
		this.init();
	}

	/**
	 * creep中保存的的post数据结构
	 * posts: {
	 * 		[post.id]: {
	 * 			status:,
	 * 			* 以下是该post特有的参数
	 * 			containers:,
	 * 			sources:,
	 * 			path:,
	 * 		}
	 * }
	 */

	/**
	 * 合同的处理函数
	 */
	launch() {
		// super.launch();
		const that = this;
		if (this.entries['creeps']) {
			let tempCreep;
			_.map(this.entries['creeps'], creep => {
				const postMemory = creep.memory.posts[this.id];
				const statusObject = that.dictionary[postMemory.status];
				console.log(postMemory.status);
				if (statusObject) {
					if (statusObject.before instanceof Function) statusObject.before(creep);
				} else this.init();
			});
		}
	}

	/**
	 * Post 的一次性初始化
	 */
	init() {
		Log.info(`init post ${this.id}`);
		const that = this;
		const creeps = this.entries['creeps'];
		if (creeps) {
			_.map(creeps, creep => {
				let postMemory = creep.memory.posts[this.id];
				if (!creep.posts) creep.posts = {};
				let postData = (creep.posts[this.id] = {
					...postMemory,
				});
				if (!postMemory) postMemory = creep.memory.posts[this.id] = {};
				if (!postData) postData = creep.posts[this.id] = {};
				// 设置status
				postMemory.status = _.sum(creep.carry) > 0 ? 'moveToContainer' : 'moveToSource';
				postData.status = postMemory.status;
				console.log(JSON.stringify(postMemory));
				console.log(JSON.stringify(postData));

				/**
				 * 每个creep的posts内对应该本合同的配置对象都存储了相关的id
				 * 本函数将这些id实例化到运行时环境
				 */
				if (_.isString(postMemory.target) && _.isString(postData['target'])) {
					console.log(postData['target'], postMemory.target);
					postData['target'] = Game.getObjectById(postMemory.target);
				} else that.selectTarget(creep);
				if (_.isString(postMemory.container) && _.isString(postData['container'])) {
					postData['container'] = Game.getObjectById(postMemory.container);
				} else that.initContainer(creep);
			});
		}
	}

	/**
	 * 初始化目标对象
	 * 可能存在多个目标，多选一
	 */
	selectTarget(creep) {
		const postMemory = creep.memory.posts[this.id];
		const postData = creep.posts[this.id];
		if (!postData.target) {
			const sources = this.entries['sources'];
			_.forEach(sources, source => {
				if (source.energy !== 0) {
					postData.target = source;
					postMemory.target = source.id;
					return false;
				}
			});
		}
	}

	/**
	 * 状态初始化方法
	 * 检查现在处于哪个状态
	 * 初始化原则: 背包清空后再前往矿点
	 * 同时需要初始化container对象，动态查找一个最近的进行绑定，满了之后再找另一个没满的
	 */
	initContainer(creep) {
		const postMemory = creep.memory.posts[this.id];
		const postData = creep.posts[this.id];
		/**
		 * 判断是否已经分配合适的container
		 * 如果容器存在且空间未满则不分配新的容器
		 */
		if (postMemory.container) {
			// 已经分配有container
			const container = Game.getObjectById(postMemory.container);
			if (
				(container && (container.energy && container.energy < container.energyCapacity)) ||
				(container.store && _.sum(container.store) < container.storeCapacity)
			) {
				return;
			}
		}
		// 分配可用的container
		let container;
		// 找最近的房间，从资源点所在房间开始找起
		let room = postData.target.room;
		container = this.findContainerInRoom(room);

		// 去附近的房间查找
		if (!container) {
			// room =
			let l;
			const roomList = Object.keys(Game.rooms);
			_.forEach(Game.rooms, tempRoom => {
				if (tempRoom.name !== postData.target.room.name) {
					const lt = Game.map.getRoomLinearDistance(tempRoom.name, postData.target.room.name);
					if (!l || lt < l) {
						l = lt;
						room = tempRoom;
						container = this.findContainerInRoom(room);
					}
				}
			});
		}
		if (!container) Log.error('我次奥为什么找不到可以用的容器啊！');
		else {
			postData.container = container;
			postMemory.container = postData.container.id;
		}
	}

	/**
	 * 在指定房间内查找可以存放source energy的容器
	 * 优先级为: container, spawn, extension, storage
	 *
	 * @param room
	 */
	findContainerInRoom(room) {
		// container
		let container;
		const roomContainer = _.filter(ContainerManager.entries, e => e.room.name === room.name);
		if (roomContainer && roomContainer.length > 0) {
			_.forEach(roomContainer, c => {
				if (_.sum(c.store) < c.storeCapacity) {
					container = c;
					return false;
				}
			});
		}
		// // spawn
		const roomSpawn = _.filter(SpawnManager.entries, e => e.room.name === room.name);
		console.log(roomSpawn);
		if (!container) {
			_.forEach(roomSpawn, spawn => {
				if (spawn.energy < spawn.energyCapacity) {
					container = spawn;
					return false;
				}
			});
		}
		// // extension
		const roomExtension = _.filter(ExtensionManager.entries, e => e.room.name === room.name);
		if (!container) {
			_.forEach(roomExtension, extension => {
				if (extension.energy < extension.energyCapacity) {
					container = extension;
					return false;
				}
			});
		}
		// // storage
		if (!container && room.storage) {
			if (_.sum(room.storage.store) < room.storage.storeCapacity) {
				container = room.storage;
			}
		}
		return container;
	}

	checkCarryEmpty(creep) {
		return _.sum(creep.carry) === 0;
	}

	checkCarryIsFull(creep) {
		return _.sum(creep.carry) === creep.carryCapacity;
	}

	checkContainerIsfull(container) {
		return (
			(container.energy && container.energy === container.energyCapacity) ||
			(container.store && _.sum(container.store) === container.storeCapacity)
		);
	}

	/**
	 * 状态字典
	 */
	dictionary = {
		moveToSource: {
			// 移动到矿点
			before: creep => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				/**
				 * 判断背包是否为空
				 * 不为空则转换到moveToContainer状态
				 */
				if (!this.checkCarryEmpty(creep)) {
					postMemory.status = 'moveToContainer';
					postData.status = 'moveToContainer';
					this.dictionary[postData.status].before(creep);
					return;
				}
				/**
				 * 前往的矿点是否还有资源
				 * 已枯竭则更换资源点
				 */
				if (postData.target.energy === 0) {
					// Log.error('需要更换资源点');
					this.selectTarget(creep);
				}

				/**
				 * 是否已经到达矿点
				 * 到达则转换到hervest状态
				 */
				if (creep.pos.isNearTo(postData.target)) {
					if (postMemory.tempPath || postData.tempPath) {
						// 到达矿点后删除临时路径（如果存在的话）
						delete postMemory.tempPath;
						delete postData.tempPath;
					}
					postMemory.status = 'hervest';
					postData.status = 'hervest';
					this.dictionary[postData.status].before(creep);
					return;
				}

				this.dictionary[postData.status].do(creep);
			},
			do: creep => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				// const path = PathManager.entries[0].path;
				// 	for (let i = 0; i < path.length - 1; ++i) {
				// 		const p1 = path[i];
				// 		const p2 = path[i + 1];
				// 		creep.room.visual.line(p1.x, p1.y, p2.x, p2.y,
				// 			{ color: 'white', lineStyle: 'dashed' });
				// 	}
				/**
				 * 前往矿点
				 * 是否有可用的path
				 * 优先判断是否有临时路径
				 * 临时路径一般不是固定路径，临时构建的路径，
				 */

				// let totalPath: any = postData.tempPath;
				// let index: number;
				// if (!totalPath) { // 不存在临时路径
				// 	if (postData.pathIndex) {
				// 		totalPath = PathManager.getByIndex(postData.pathIndex);
				// 	} else {
				// 		console.log(postData.container, postData.target);
				// 		const searchPath = PathManager.find(postData.container.id, postData.target.id);
				// 		totalPath = searchPath.path;
				// 		index = searchPath.index;
				// 		if (!totalPath) { // 路径库中没有找到可用的路径，创建一条新的
				// 			totalPath = {
				// 				path: creep.room.findPath(postData.container.pos, postData.target.pos),
				// 			}
				// 			PathManager.add(postData.container.id, postData.target.id, totalPath.path);
				// 			index = PathManager.entries.length;
				// 		}
				// 		postMemory.pathIndex = index;
				// 		postData.pathIndex = index;
				// 	}
				// }

				// /**
				//  * 判断是否需要置换path方向
				//  */
				// if (totalPath.id2 && totalPath.id2 === postData.container.id) {
				// 	totalPath.path = _.reverse(totalPath.path);
				// }
				// move
				console.log(postData.target);
				creep.moveTo(postData.target.pos);
				creep.room.visual.line(creep.pos, postData.target.pos, {
					color: 'red',
					lineStyle: 'dashed',
				});
				// console.log(moveRes);
				// creep.room.visual.
				/**
				 * 不在固定路径上，创建临时路径
				 */
				// if (moveRes === ERR_NOT_FOUND) {
				// 	totalPath = creep.room.findPath(creep.pos, postData.target.pos);
				// 	postMemory.tempPath = { path: totalPath };
				// 	postData.tempPath = { path: totalPath };
				// 	creep.moveByPath(totalPath); // 沿临时路径移动
				// }
			},
		},
		moveToContainer: {
			// 移动至容器
			before: creep => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				/**
				 * 判断背包是否已经清空
				 * 空了则转换到moveToSource状态
				 */
				if (this.checkCarryEmpty(creep)) {
					postMemory.status = 'moveToSource';
					postData.status = 'moveToSource';
					this.dictionary[postData.status].before(creep);
					return;
				}

				/**
				 * 前往的容器是否已满
				 * 满了则更换容器
				 */
				if (this.checkContainerIsfull(postData.target)) {
					this.initContainer(postData.target);
				}

				/**
				 * 是否已经到达容器
				 * 到达则转换到transfer状态
				 */
				if (creep.pos.isNearTo(postData.container)) {
					if (postMemory.tempPath || postData.tempPath) {
						delete postMemory.tempPath;
						delete postData.tempPath;
					}
					postMemory.status = 'transfer';
					postData.status = 'transfer';
					this.dictionary[postData.status].before(creep);
					return;
				}
				this.dictionary[postData.status].do(creep);
			},
			do: creep => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				/**
				 * 前往容器
				 * 是否有可用的path
				 * 优先判断是否有临时路径
				 * 临时路径一般不是固定路径，临时构建的路径，
				 */

				let totalPath = postData.tempPath;
				let index;
				if (!totalPath) {
					// 不存在临时路径
					if (postData.pathIndex) {
						totalPath = PathManager.getByIndex(postData.pathIndex);
					} else {
						const searchPath = PathManager.find(postData.container.id, postData.target.id);
						totalPath = searchPath.path;
						index = searchPath.index;
						if (!totalPath) {
							// 路径库中没有找到可用的路径，创建一条新的
							totalPath = {
								path: creep.room.findPath(postData.container.pos, postData.target.pos),
							};
							PathManager.add(postData.container.id, postData.target.id, totalPath.path);
							index = PathManager.entries.length;
						}
						postMemory.pathIndex = index;
						postData.pathIndex = index;
					}
				}

				/**
				 * 判断是否需要置换path方向
				 */
				if (totalPath.id2 && totalPath.id2 === postData.target.id) {
					totalPath.path = _.reverse(totalPath.path);
				}

				const moveRes = creep.moveByPath(totalPath.path);
				/**
				 * 不在固定路径上，创建临时路径
				 */
				if (moveRes === ERR_NOT_FOUND) {
					totalPath = creep.room.findPath(creep.pos, postData.container.pos);
					postMemory.tempPath = { path: totalPath };
					postData.tempPath = { path: totalPath };
					creep.moveByPath(totalPath); // 沿临时路径移动
				}
			},
		},
		transfer: {
			// 放置
			before: creep => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				/**
				 * 判断背包是否已经清空
				 * 空了则转换到moveToSource状态
				 */
				if (!this.checkCarryEmpty(creep)) {
					postMemory.status = 'moveToSource';
					postData.status = 'moveToSource';
					this.dictionary[postData.status].before(creep);
					return;
				}

				/**
				 * 前往的容器是否已满
				 * 满了则更换容器，转换状态为moveToContainer
				 */
				if (this.checkContainerIsfull(postData.target)) {
					this.initContainer(postData.target);
					postMemory.status = 'moveToContainer';
					postData.status = 'moveToContainer';
					this.dictionary[postData.status].before(creep);
					return;
				}

				this.dictionary[postData.status].do(creep);
			},
			do: creep => {
				// const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				// 放置
				creep.transfer(postData.container, RESOURCE_ENERGY);
			},
		},
		hervest: {
			// 采集
			before: creep => {
				const postMemory = creep.memory.posts[this.id];
				const postData = creep.posts[this.id];
				/**
				 * 判断背包是否已满
				 * 满了则切换到moveToContainer状态
				 */
				console.log(this.checkCarryIsFull(creep));
				if (this.checkCarryIsFull(creep)) {
					postMemory.status = 'moveToContainer';
					postData.status = 'moveToContainer';
					this.dictionary[postData.status].before(creep);
				}

				/**
				 * 前往的矿点是否还有资源
				 * 已枯竭则更换资源点
				 * 并转换状态为moveToSource
				 */
				if (postData.target.energy === 0) {
					// Log.error('需要更换资源点');
					this.selectTarget(creep);
					postMemory.status = 'moveToSource';
					postData.status = 'moveToSource';
					this.dictionary[postData.status].before(creep);
					return;
				}

				this.dictionary[postData.status].do(creep);
			},
			do: creep => {
				const postData = creep.posts[this.id];
				// 采集
				creep.harvest(postData.target);
			},
		},
	};

	/**
	 * 状态转换方法
	 */
	convert() {}
}
