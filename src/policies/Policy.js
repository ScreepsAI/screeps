/**
 * Author: Ruo
 * Create: 2018-05-04
 * Description: 政策
 */
import _ from 'lodash';
export class Policy {
	constructor() {}

	statistic() {
		_.forEach(Game.rooms, room => {
			RoomManager.add(room);
			ControllerManager.add(room.controller);
			SourceManager.addEntries(room.find(FIND_SOURCES));
			// CreepManager.addEntries(room.find(FIND_MY_CREEPS));
			const structures = room.find(FIND_STRUCTURES);
			SpawnManager.addEntries(_.filter(structures, o => o.structureType === STRUCTURE_SPAWN));
			ContainerManager.addEntries(
				_.filter(structures, o => o.structureType === STRUCTURE_CONTAINER),
			);
			ExtensionManager.addEntries(
				_.filter(structures, o => o.structureType === STRUCTURE_EXTENSION),
			);
		});
	}

	/**
	 * 监视，run in every tick
	 * 内容包括敌人，是否有creep受伤，有建筑受损
	 */
	oversee(room) {
		// creeps
		CreepManager.addEntries(room.find(FIND_CREEPS), true);
		// constructionSites
		ConstructionSiteManager.addEntries(room.find(FIND_CONSTRUCTION_SITES), true);
		// my creep which has been hit

		// my structure which has been hit
	}

	roomParams(room) {
		const roomParams = {
			roomLevel: room.rcl,
		};
		const energyParams = {
			energy: room.energy,
			energyCapacity: room.energyCapacity,
			energyLevel: Math.floor(room.energy / room.energyCapacity * 10),
		};
		const defendParams = {
			hostileCreeps: room.hostileCreeps,
		};
		return Object.assign({}, roomParams, energyParams, defendParams);
	}

	do(room) {
		const params = this.roomParams(room);
		const { roomLevel } = params;
		const policyFunc = require(`./roomLevels/${roomLevel}.js`);
		if (policyFunc instanceof Function) policyFunc(room, params);
	}
}
