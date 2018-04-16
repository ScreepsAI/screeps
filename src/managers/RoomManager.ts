import * as _ from 'lodash';
// import { Manager } from './Manager';
// import { RoomType } from '../enums/room';
// import { isFriend } from '../utils';

/**
 * RoomManager作为房间管理器
 * 负责初始化所有房间的数据，并存储到Memory中
 * Memory.Managers.Room = {
 *    entries: {
 * 		[roomName]: {
 * 			my:,
 * 		}
 *    }
 *    statisticTime:,
 * }
 */
export class RoomManager {
	public name: string;
	public cacheName: string;
	public entries: any;

	constructor() {
		this.name = 'Room';
		this.cacheName = 'RoomCaches';
		this.entries = {};
		if (!Memory.Managers) Memory.Managers = {};
		if (!Memory.Managers.Room) {
			this.caches = {};
			this.memory = {
				entries: {},
				statisticTime: undefined,
			};
		}
		this.rebootFromMemory();
	}

	get caches() {
		return caches[this.cacheName];
	}

	set caches(v) {
		caches[this.cacheName] = v;
	}

	get memory(): any {
		return Memory.Managers[this.name];
	}

	set memory(value: any) {
		Memory.Managers[this.name] = value;
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
				entry => WHITELIST.indexOf(entry.controller.onwer.username) >= 0,
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
				entry => WHITELIST.indexOf(entry.controller.onwer.username) < 0,
			);
			this.caches._hostile.time = Game.time;
		}
		return this.caches._hostile.data;
	}

	// 获取该管理器管理的对象
	getEntry(roomName: string): IdObject | undefined {
		return this.entries[roomName];
	}

	addEntry(room: Room): void {
		this.memory.entries[room.name] = {
			my: room.my,
		};
		this.entries[room.name] = room;
	}

	addEntries(rooms: IdObject[]) {
		if (_.isArray(rooms)) {
			const that = this;
			_.map(rooms, (room: Room) => that.addEntry(room));
		}
	}

	/**
	 * 房间管理器每tick都会执行的方法
	 * 用来检查房间状态，以及安排相应的任务
	 */
	check(): void {
		_.forEach(Game.rooms, room => {
			/**
			 * policy for energy
			 * 检查房间
			 * 能量储量 = 当前存量 / 可存量
			 * 当前存量|可存量 = spawn + extension + container + storage
			 */
			const energy = room.energy;
			const energyCapacity = room.energyCapacity;
			if (energy / energyCapacity < 0.9 || energyCapacity === 300) {// 如果能量储量小于90%
				/**
				 * SourceManager
				 * 检查矿点工位是否已满
				 */
				_.forEach(room.source, source => {
					const adjacents = source.accessibleFields; // 获取空的工位列表
					// console.log(adjacents);
					// 由SourceManager保存和发布工位招领信息
					if (adjacents.length - source.posts.length > 0) { // 判断是否需要配置新的岗位
						SourceManager.createPost(undefined, [source], adjacents);
					}
				});

				/**
				 * 暂时跳过
				 * ==============================================
				 * PostManager
				 * 检查并筛选出是否有空的合同
				 * 如合同工已经亡故
				 */
				// global.PostManager.checkIdlePost();

				/**
				 * 暂时跳过
				 * ==============================================
				 * CreepManager
				 * 检查是否有没有工作的creep
				 * 有的话，请它们认领任务
				 */

				/**
				 * PostManager
				 * 检查是否还有空的岗位
				 * 有的话，创造Creep来填补空缺岗位
				 */
				PostManager.dealwithNoPosterPosts();

				/**
				 * 各个拥有order的manager检查并处理order列表
				 * SpawnManager
				 */

				/**
				 * 遍历所有creep和主动行为对象(tower之类的)
				 * 并处理他们的post列表
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
	statistic(complete = false): void {
		const that = this;
		_.map(Game.rooms, room => {
			if (complete) {
				that.addEntry(room);
				// source
				SourceManager.addEntries(room.find(FIND_SOURCES));
				// path from container to source
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


	/**
	 * 是指从Memory恢复数据到global中
	 */
	rebootFromMemory(): void {
		const that = this;
		// this.entries = {};
		_.forEach(this.memory.entries, (roomData, roomName) => {
			if (roomName in Game.rooms) that.entries[roomName] = roomData;
			else this.memory.entries[roomName]['my'] = false;
		})
		Log.success(`Reboot ${_.padEnd(that.name, 20, ' ')} have ${Object.keys(that.entries).length} entries`);
	}
}
