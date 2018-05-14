import _ from 'lodash';
import { Manager } from './Manager';

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
export class RoomManager extends Manager {
	constructor() {
		super('room', Room);
	}

	/**
	 * 房间管理器每tick都会执行的方法
	 * 用来检查房间状态，以及安排相应的任务
	 */
	// check() {
	// 	_.forEach(Game.rooms, room => {
	// 		/**
	// 		 * policy for energy
	// 		 * 检查房间
	// 		 * 能量储量 = 当前存量 / 可存量
	// 		 * 当前存量|可存量 = spawn + extension + container + storage
	// 		 */
	// 		const energy = room.energy;
	// 		const energyCapacity = room.energyCapacity;
	// 		console.log(energy, energyCapacity);
	// 		if (energy / energyCapacity < 0.9 || energyCapacity === 300) {
	// 			// 如果能量储量小于90%
	// 			/**
	// 			 * SourceManager
	// 			 * 检查矿点工位是否已满
	// 			 */
	// 			_.forEach(room.source, source => {
	// 				const adjacents = source.accessibleFields; // 获取空的工位列表
	// 				// console.log(adjacents);
	// 				// 由SourceManager保存和发布工位招领信息
	// 				console.log(adjacents.length, source.posts.length);
	// 				if (adjacents.length - source.posts.length > 0) {
	// 					// 判断是否需要配置新的岗位
	// 					// SourceManager.createPost(undefined, [source], adjacents);
	// 				}
	// 			});
	//
	// 			/**
	// 			 * 暂时跳过
	// 			 * ==============================================
	// 			 * PostManager
	// 			 * 检查并筛选出是否有空的合同
	// 			 * 如合同工已经亡故
	// 			 */
	// 			// global.PostManager.checkIdlePost();
	//
	// 			/**
	// 			 * 暂时跳过
	// 			 * ==============================================
	// 			 * CreepManager
	// 			 * 检查是否有没有工作的creep
	// 			 * 有的话，请它们认领任务
	// 			 */
	// 		}
	// 	});
	// 	/**
	// 	 * PostManager
	// 	 * 检查是否还有空的岗位
	// 	 * 有的话，创造Creep来填补空缺岗位
	// 	 */
	// 	// PostManager.normalPosts;
	// 	// PostManager.dealwithUntreatedPosts();
	//
	// 	/**
	// 	 * 各个拥有order的manager检查并处理order列表
	// 	 * SpawnManager
	// 	 */
	// 	// SpawnManager.dealwithCreateOrder();
	//
	// 	/**
	// 	 * 遍历所有Posts并处理之
	// 	 */
	// 	// PostManager.check();
	// }

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
	// statistic(complete = false) {
	// 	const that = this;
	// 	_.map(Game.rooms, room => {
	// 		if (complete) {
	// 			that.addEntry(room);
	// 			// source
	// 			SourceManager.addEntries(room.find(FIND_SOURCES));
	// 			// path from container to source
	// 		}
	//
	// 		/**
	// 		 * structures
	// 		 * spawn，controller
	// 		 */
	// 		_.each(room.find(FIND_STRUCTURES), structure => {
	// 			if (global[_.upperFirst(structure.structureType) + 'Manager']) {
	// 				global[_.upperFirst(structure.structureType) + 'Manager'].addEntry(structure);
	// 			}
	// 		});
	// 	});
	// }
}
