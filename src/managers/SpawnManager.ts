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

	constructor() {
		super('spawn');
	}

	/**
	 * 一个creep生产订单的结构
	 * spawnId 被分配生产任务的Spawn的Id
	 * name creep的名字
	 * body
	 * option {
	 * 		posts:{}, 新Creep的工作合同列表，仅存贮合同id
	 * }
	 * status 订单状态，0：已完成，1：进行中，2：排队中，3：待删除
	 */

	/**
	 * 添加一个生产Creep的订单
	 */
	addCreateOrder(obj: any) {
		if (this.memory.entries[obj.id] === undefined) {
			this.memory.entries[obj.id] = obj;
		}
		this.entries[obj.id] = obj;
		return this.entries;
	}


	/**
	 * 使用合同信息来生产creep
	 * @param post 
	 */
	createCreepByPost(post: Post) {
		// 查找里目标最近的spawn
		const spawn = this.findTargetSpawn(post.target[0]);
		this.addCreateOrder({
			spawnId: spawn.id,
			name: post.postType + '-' + (new Date()).getTime(),
			body: post.bodyNeed,
			option: {
				posts: {},
			},
			status: 2, // 排队中
		});
	}


	/**
	 * 
	 * @param target 查找离目标最近的Spawn
	 */
	findTargetSpawn(target: any): StructureSpawn {
		let tempRoom: Room = target.room;
		let spawn = target.room.mySpawn[0];
		if (!spawn) { // target room has no spawn
			let l: number;
			_.forEach(Game.rooms, (room) => {
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

	public clean() { }
	// private buildSpawnOrder(room: Room): void {
	// _.forEach(Setups, setup => {
	// 	const RclSetup = setup.run(room);
	// 	const Role = setup.name as number;
	// 	if (RclSetup.maxCount === 0) return;
	// 	// 检查 房间 + 生产中的数量
	// 	const roomCount = room.getRoleCount(Role);
	// 	const orderCount = _.filter(this.getOrder(room), (o: CreepOrder) => o.memory.role === Role).length;
	// 	if (roomCount + orderCount < RclSetup.maxCount) {
	// 		Log.room(room, 'Make spawn order:', RoleType[Role]);
	// 		let Body = makeBodyArray(RclSetup.fixedBody);
	// 		const multiBody = makeBodyArray(RclSetup.multiBody);
	// 		for (let multi = 1; multi <= RclSetup.maxMulti; multi++) {
	// 			Body = Body.concat(multiBody);
	// 		}
	// 		this.createOrder(room, {
	// 			priority: RolePriority[RoleType[Role]],
	// 			body: Body,
	// 			memory: {
	// 				role: Role,
	// 				homeRoom: room.name,
	// 			},
	// 		});
	// 	}
	// });
	// }

	// private getOrder(room: Room): CreepOrder[] {
	// 	if (_.isUndefined(room.memory.orders)) room.memory.orders = [];
	// 	return room.memory.orders;
	// }

	// private createOrder(room: Room, order: CreepOrder): void {
	// 	room.memory.orders.push(order);
	// }

	// private spawnQueue(room: Room, spawns: StructureSpawn[]) {
	// 	if (room.memory.orders === undefined) room.memory.orders = [];
	// 	if (room.memory.orders.length === 0) return; // 订单列表为空则返回
	// 	const spawn = spawns[0];

	// 	// 按优先级排序
	// 	room.memory.orders.sort((a: CreepOrder, b: CreepOrder) => {
	// 		return a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
	// 	});

	// 	// 获取订单
	// 	const order = room.memory.orders[0] as CreepOrder;
	// 	const cost = getCost(order.body);
	// 	if (room.energyAvailable < cost) return; // 能量不足则返回
	// 	// get name
	// 	const role = order.memory.role;
	// 	let preUuid = this.memory.uuid[role];
	// 	if (_.isUndefined(preUuid)) preUuid = 0;
	// 	const uuid = preUuid + 1;
	// 	const name = [RoleType[role], cost, uuid].join('-') as string;
	// 	const callback = spawn.spawnCreep(order.body, name, {
	// 		// TODO: energyStructures
	// 	}) as number;

	// 	if (callback === OK) {
	// 		// update uuid
	// 		room.memory.orders.shift();
	// 		Memory.creeps[name] = {
	// 			...order.memory,
	// 			name: name,
	// 			hasBorn: false,
	// 		};
	// 		this.memory.uuid[role] = preUuid >= 99 ? 0 : uuid;
	// 		Log.room(room, `Spawning: ${name}`);
	// 	} else {
	// 		Log.error(`[${room.name}] ${ErrorType[callback]} with ${name}`);
	// 	}
	// }
}
