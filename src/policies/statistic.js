/**
 * Author: Ruo
 * Create: 2018-05-04
 * Description:
 */
import _ from 'lodash';

// 统计自己的creep和设施，并存入memory中
export const statisitc = () => {
	_.forEach(Game.rooms, room => {
		RoomManager.add(room);
		SourceManager.addEntries(room.find(FIND_SOURCES));
		CreepManager.addEntries(room.find(FIND_MY_CREEPS));
		SpawnManager.addEntries(
			room.find(FIND_MY_SPAWNS, { filter: { structureType: STRUCTURE_SPAWN } }),
		);
		ContainerManager.addEntries(
			room.find(FIND_MY_SPAWNS, { filter: { structureType: STRUCTURE_CONTAINER } }),
		);
		ExtensionManager.addEntries(
			room.find(FIND_MY_SPAWNS, { filter: { structureType: STRUCTURE_EXTENSION } }),
		);
		ControllerManager.add(room.controller);
		ConstructionSiteManager.addEntries(room.find(FIND_CONSTRUCTION_SITES));
	});
};

// 监视 不是自己的creep和设施
export const oversee = () => {
	// hostile creep
	CreepManager.addEntries(room.find(FIND_HOSTILE_CREEPS), true);
	// hostile structure

	// my creep which has been hit

	// my structure which has been hit
};
