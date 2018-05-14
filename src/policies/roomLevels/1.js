import _ from 'lodash';
import { UUID } from '../../utils/global';

/**
 * 一个room在一个tick时的状态字典
 * @param roomLevel
 */
export default (room, { roomLevel = 1 }) => {
	if (room === undefined) throw new Error('room is undefined');
	if (roomLevel !== 1) throw new Error(`wrong room level: ${roomLevel}`);

	/**
	 * 一级
	 * energy的采集
	 * 升级controller
	 */
	const spawn = room.mySpawns[0];

	// 先将source周围的工作区域安排满
	const sources = room.sources;
	const controller = room.controller;

	_.forEach(sources, source => {
		let m = source.accessibleWorkers.length - source.currentWorkers.length;
		while (m > 0) {
			const uuid = UUID();
			const body = [MOVE, MOVE, WORK, CARRY];
			const test = spawn.spawnCreep(body, uuid, { dryRun: true });
			if (test === OK) {
				source.setWorker(uuid);
				spawn.addOrder(body, uuid, {
					memory: {
						UUID: uuid,
						role: 'miner',
						source: source.UUID,
						controller: controller.UUID,
					},
				});
			}
			--m;
		}
	});

	// 遍历执行spawn的order
	let order = spawn.orders[0];
	if (spawn.spawning) return;
	else if (order) {
		const { body, name, opts } = spawn.headOrder;
		spawn.spawnCreep(body, name, opts);
	}

	// 遍历所有creep根据role执行动作
	_.forEach(CreepManager.entries, creep => {
		console.log(creep);
		if (creep.memory.role === 'miner') {
			const source = SourceManager.get(creep.memory.source);
			console.log(
				creep.pos.isNearTo(source) && !creep.fullBag,
				creep.pos.isNearTo(spawn) && !creep.emptyBag && !spawn.isFull,
				!creep.pos.isNearTo(source) && creep.emptyBag,
				!creep.pos.isNearTo(spawn) && creep.fullBag,
				creep.pos.isNearTo(spawn) && spawn.isFull,
			);
			if (creep.pos.isNearTo(source) && !creep.fullBag) creep.harvest(source);
			else if (creep.pos.isNearTo(spawn) && !creep.emptyBag && !spawn.isFull)
				creep.transfer(spawn, RESOURCE_ENERGY);
			else if (!creep.pos.isNearTo(source) && creep.emptyBag) creep.moveTo(source.pos);
			else if (!creep.pos.isNearTo(spawn) && creep.fullBag) creep.moveTo(spawn);
			else if (creep.pos.isNearTo(spawn) && spawn.isFull) creep.memory.role = 'upgrade';
		} else if (creep.memory.role === 'upgrade') {
			const controller = ControllerManager.get(creep.memory.controller);
			if (creep.pos.isNearTo(controller) && !creep.emptyBag) creep.upgradeController(controller);
			else if (!creep.pos.isNearTo(controller) && creep.fullBag) creep.moveTo(controller);
			else if (creep.pos.isNearTo(controller) && creep.emptyBag) creep.memory.role = 'miner';
		} else if (creep.memory.role === 'build') {
		}
	});
};
