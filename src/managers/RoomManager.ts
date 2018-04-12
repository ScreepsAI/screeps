import * as _ from 'lodash';
// import { Manager } from './Manager';
// import { RoomType } from '../enums/room';
// import { isFriend } from '../utils';

/**
 * RoomManager作为房间管理器
 * 负责初始化所有房间的数据，并存储到Memory中
 * Memory.Managers.Room = {
 *    entries: {
 *    }
 *    statisticTime:,
 * }
 */
export class RoomManager {
	public name: string;
	public cacheName: string;

	constructor() {
		this.name = 'Room';
		this.cacheName = 'RoomCaches';
		this.init();
	}

	get caches() {
		return global.caches[this.cacheName];
	}

	set caches(v) {
		global.caches[this.cacheName] = v;
	}

	get memory(): any {
		return Memory.Managers[this.name];
	}

	set memory(value: any) {
		Memory.Managers[this.name] = value;
	}

	get entries() {
		return this.memory.entries;
	}

	/**
	 * =================================================================
	 * my, ally, hostile都是单帧缓存，即只在一个tick内有效的缓存
	 * =================================================================
	 */

	get my() {
		if (!this.caches._my) this.caches._my = {};
		if (!this.caches._my.data || this.caches._my.time < Game.time) {
			this.caches._my.data = _.filter(this.entries, entry => entry.controller.my === true);
			this.caches._my.time = Game.time;
		}
		return this.caches._my.data;
	}

	get ally() {
		if (!this.caches._ally) this.caches._ally = {};
		if (!this.caches._ally.data || this.caches._ally.time < Game.time) {
			this.caches._ally.data = _.filter(
				this.entries,
				entry => global.WHITELIST.indexOf(entry.controller.onwer.username) >= 0,
			);
			this.caches._ally.time = Game.time;
		}
		return this.memory._ally.data;
	}

	get hostile() {
		if (!this.caches._hostile) this.caches._hostile = {};
		if (!this.caches._hostile.data || this.caches._hostile.time < Game.time) {
			this.caches._hostile.data = _.filter(
				this.entries,
				entry => global.WHITELIST.indexOf(entry.controller.onwer.username) < 0,
			);
			this.caches._hostile.time = Game.time;
		}
		return this.caches._hostile.data;
	}

	// 获取该管理器管理的对象
	get(id: string): IdObject | undefined {
		return this.entries[id];
	}

	addEntry(obj: Room): RoomObject[] {
		this.memory.entries[obj.name] = {};
		return this.entries;
	}

	addEntries(objs: IdObject[]) {
		if (_.isArray(objs)) {
			_.each(objs, obj => (this.entries[obj.id] = obj));
		}
	}

	init() {
		if (!Memory.Managers) Memory.Managers = {};
		if (!Memory.Managers.Room) {
			this.caches = {};
			this.memory = {
				entries: {},
				statisticTime: undefined,
			};
		}
	}

	/**
	 * 房间管理器每tick都会执行的方法
	 * 用来检查房间状态，以及安排相应的任务
	 */
	check() {
		_.forEach(Game.rooms, room => {
			/**
			 * policy for energy
			 * 检查房间
			 * 能量储量 = 当前存量 / 可存量
			 * 当前存量|可存量 = spawn + extension + container + storage
			 */
			const energy = room.energy;
			const energyCapacity = room.energyCapacity;
			if (energy / energyCapacity < 0.9) {
				// 如果能量储量小于90%
				/**
				 * SpawnManager
				 * 检查矿点工位是否已满
				 */
				_.forEach(room.source, source => {
					const adjacents = source.pos.getAdjacent(); // 获取空的工位列表
					// 由SourceManager保存和发布工位招领信息
					global.SpawnManager.sendPost(adjacents);
				});
				/**
				 * PostManager
				 * 检查并筛选出是否有空的合同
				 * 如合同工已经亡故
				 */

				/**
				 * CreepManager
				 * 检查是否有没有工作的creep
				 * 有的话，请它们认领任务
				 */

				/**
				 * SpawnManager
				 * 检查是否还有空的岗位
				 * 有的话，创造Creep来填补空缺岗位
				 */
			}
		});
	}

	/**
	 * 数据分析方法，分析结果存储至相应Manager的Memory中，可以用于初始化RoomManager
	 * 统计所有房间的资源和资产情况
	 *
	 * 静态数据
	 * source, controller
	 *
	 * 动态数据
	 * resource, spawn, creep, constructionSite, extension
	 * @param {boolean} [complete=false] 是否重新进行完全分析,默认只分析易变的的数据
	 */
	statistic(complete = false) {
		const that = this;
		_.map(Game.rooms, room => {
			//
			if (complete) {
				that.addEntry(room);
				// source
				global.SourceManager.addEntries(room.find(FIND_SOURCES));
			}

			/**
			 * structures
			 * spawn，controller
			 */
			_.each(room.find(FIND_STRUCTURES), structure => {
				if (global[_.upperFirst(structure.structureType) + 'Manager']) {
					global[_.upperFirst(structure.structureType) + 'Manager'].addEntry(structure);
				}
			});
		});
	}

	// public run(): void {
	// this.cleanMemory();
	// _.forEach(Game.rooms, (room: Room) => {
	// 	this.buildRoomToc(room);
	// 	this.buildCreepToc(room);
	// });
	// this.memory.roomToc = this.roomToc;
	// this.recordUpdateTime();
	// }

	public clean(): void {
		// if (_.isUndefined(Memory.rooms)) Memory.rooms = {};
		// _.forEach(Object.keys(Memory.rooms), (roomMemory: any, name: string) => {
		//   if (Object.keys(roomMemory).length === 0) {
		//     delete Memory.rooms[name];
		//     return;
		//   }
		//   const timeCheck = roomMemory.time;
		//   if (!_.isUndefined(timeCheck) && timeCheck < Game.time - this.ROOM_MEMORY_TIMECHECK && !Game.rooms[name]) {
		//     delete Memory.rooms[name];
		//   }
		// });
	}

	// private buildRoomToc(room: Room): void {
	// 	room.memory.time = Game.time;
	// 	if (room.controller === undefined) {
	// 		if (room.sources.length === 0) {
	// 			// 分割区块的无人区
	// 			return this.signType(room, RoomType.public);
	// 		} else if (room.KeeperLairs.length > 0) {
	// 			// KeeperLair 矿区
	// 			return this.signType(room, RoomType.remoteKeeperLair);
	// 		} else {
	// 			// 区块中央的
	// 			return this.signType(room, RoomType.remoteCenter);
	// 		}
	// 	}
	// 	if (room.controller.my) {
	// 		if (room.spawns.length !== 0) {
	// 			// 我的基地
	// 			return this.signType(room, RoomType.home);
	// 		} else {
	// 			// 还没建设spawn的新基地
	// 			return this.signType(room, RoomType.bootstrap);
	// 		}
	// 	}
	// 	const reserver = _.get(room.controller, 'reservation.username');
	// 	if (!_.isUndefined(reserver) && reserver !== ME) {
	// 		// 被别人 Reserved 的分矿
	// 		return this.signType(room, RoomType.remoteReservedByOther);
	// 	}
	// 	const owner = _.get(room.controller, 'owner.username');
	// 	if (_.isUndefined(owner)) {
	// 		// 可以开分矿的房间
	// 		return this.signType(room, RoomType.remoteCanMine);
	// 	} else if (isFriend(owner as string)) {
	// 		// 朋友的房间
	// 		return this.signType(room, RoomType.ownByFriend);
	// 	} else {
	// 		// 敌人的房间
	// 		return this.signType(room, RoomType.ownByHostile);
	// 	}
	// }

	// private signType(room: Room, type: number): void {
	// 	room.memory.type = type;
	// 	if (_.isUndefined(this.roomToc[type])) this.roomToc[type] = [];
	// 	this.roomToc[type].push(room.name);
	// }

	// private buildCreepToc(room: Room): void {
	// 	let creepToc: { [type: number]: string[] } = {};
	// 	_.forEach(Memory.creeps, (c: CreepMemory) => {
	// 		if (c.homeRoom === room.name) {
	// 			if (_.isUndefined(creepToc[c.role])) creepToc[c.role] = [];
	// 			creepToc[c.role].push(c.name as string);
	// 		}
	// 	});
	// 	room.memory.creepToc = creepToc;
	// }
}
