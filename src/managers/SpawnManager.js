import * as _ from 'lodash';
import { Manager } from './Manager';
import { Post } from '../posts/Post';

// import { getRooms, getCost, makeBodyArray } from '../utils';
// import { Setups } from '../creeps/setups';
// import { RoomType } from '../enums/room';
// import { ErrorType } from '../enums/error';
// import { RolePriority } from '../enums/priority';
// import { RoleType } from '../enums/creep';

/**
 * Spawn管理器
 * 也负责管理creep生产线
 * SpawnManager的Memory存贮的是待生产的或正在生产中的Creep订单
 * 生产完毕后会从Memory中删除
 */
export class SpawnManager extends Manager {
	orders;
	constructor() {
		super('spawn');
	}

	/**
	 * 一个creep生产订单的结构
	 * {
	 * 		id: (new Date()).getTime(),
	 * 		spawnName:, 被分配生产任务的Spawn的Id
	 * 		name:, creep的名字
	 * 		body,
	 * 		option: {
	 * 			posts:{
	 * 				postId: {
	 * 					status:,
	 * 					...rest,
	 * 				}
	 * 			}, 新Creep的工作合同列表，仅存贮合同id
	 * 		},
	 * 		status:, 订单状态，0：已完成，1：进行中，2：排队中，3：待删除
	 * }
	 */

	/**
	 * 处理Creep生产队列
	 */
	dealwithCreateOrder() {
		const that = this;
		const orders = _.filter(this.orders, o => o.status === 0);
		_.forEach(orders, order => {
			let post;
			const { spawn, name, body, options, id, postId } = order;
			const postFromMemory = PostManager.getPostByIdOrNameFromMemory(postId);
			// console.log(postId, Object.keys(PostManager.entries));
			if (postFromMemory[0]) post = PostManager.entries[postId];
			if (spawn) {
				// console.log(spawn.spawnCreep(body, name, { dryRun: true }));
				if (
					!spawn.spawning &&
					that.memory.orders[id] &&
					spawn.spawnCreep(body, name, { dryRun: true }) === OK
				) {
					that.memory.orders[id].status = 1;
					spawn.spawnCreep(body, name, {
						memory: options,
					});

					/**
					 * 添加大时钟事件
					 * 用于出生倒计时，出生后添加到指定post中
					 */
					const clock = new SpawnCreepClock({
						name: 'spawn creep ' + name,
						initParams: {
							needTime: body.length * 3 + 1,
							creepName: name,
							postId: postId,
						},
						active: true,
					});
					ClockManager.addClock(clock);
					return false;
				}
			} else {
				// 订单执行者消失，取消订单
				delete this.orders[order.id];
				delete this.memory.orders[order.id];
			}
		});
	}

	/**
	 * 添加一个生产Creep的订单
	 */
	addCreatorOrder(order) {
		const { id, postId, spawn, name, body, options, status } = order;
		this.memory.orders[id] = {
			id,
			postId,
			spawnName: spawn.name,
			name,
			body,
			options,
			status,
		};
		this.orders[id] = order;
		return this.orders;
	}

	/**
	 * 使用合同信息来生产creep
	 * @param post
	 */
	createOrderByPost(post) {
		// 查找里目标最近的spawn
		if (post.status < 1) {
			// 判断合同状态
			let spawn;
			_.forEach(post.entries.sources, source => {
				spawn = this.findTargetSpawn(source);
				if (spawn) return false;
			});
			if (!spawn) {
				Log.error('没有找到可用的Spawn');
				return;
			}
			post.setStatus(1); // 设置为已处理状态
			this.addCreatorOrder({
				id: new Date().getTime(),
				postId: post.id,
				spawn: spawn,
				name: post.postType + '-' + new Date().getTime(),
				body: post.bodyNeed,
				options: post.options.creepMemory,
				/**
				 * 订单状态，排队中
				 */
				status: 0,
			});
		}
	}

	/**
	 * 查找离目标最近的Spawn
	 * @param target
	 */
	findTargetSpawn(target) {
		let tempRoom = target.room;
		let spawn = target.room.mySpawn[0];
		if (!spawn) {
			// target room has no spawn
			let l;
			_.forEach(Game.rooms, room => {
				const lt = Game.map.getRoomLinearDistance(room.name, target.room.name);
				if (!l || lt < l) {
					l = lt;
					tempRoom = room;
				}
			});
			spawn = tempRoom.mySpawn[0];
		}
		return spawn;
	}

	// public clean() { }

	/**
	 * 是指从Memory恢复数据到global中
	 */
	rebootFromMemory() {
		// spawn
		const that = this;
		super.rebootFromMemory();
		// order
		this.orders = {};
		_.forEach(this.memory.orders, order => {
			const { id, spawnName, name, options, status, body, postId } = order;
			that.orders[id] = {
				spawn: Game.spawns[spawnName],
				postId,
				name,
				options,
				status,
				body,
				id,
			};
		});
		Log.success(
			`Reboot ${_.padEnd(that.name + ' ' + 'Order', 20, ' ')} have ${
				Object.keys(that.orders).length
			} orders`,
		);
	}

	setEmpty() {
		this.memory.entries = {};
		this.entries = {};
		this.memory.orders = {};
		this.orders = {};
		this.rebootFromMemory();
	}
}
