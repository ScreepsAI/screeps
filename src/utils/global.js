// eslint-disable-block
import * as _ from 'lodash';
// 间隔执行
/**
 *
 * @param {Function} func
 * @param {Number} ticks
 */
export const setTickout = (func, ticks) => {
	if (Game.time % ticks === 0) func();
};

export const getUsername = () => {
	const room = _.filter(Game.rooms, o => (o.controller ? o.controller.my : false))[0];
	const controller = room.controller;
	if (room && controller) return controller.owner.username;
};

export const UUID = randomLength =>
	Number(
		Math.random()
			.toString()
			.substr(3, randomLength) + Date.now(),
	).toString(36);

const ScreepsIdClassList = [
	'Creep',
	'Source',
	'Resource',
	'Mineral',
	'ConstructionSite',
	'Tombstone',
	'StructureController',
	'StructureContainer',
	'StructureExtension',
	'StructureExtractor',
	'StructureKeeperLair',
	'StructureLab',
	'StructureLink',
	'StructureNuker',
	'StructureObserver',
	'StructurePortal',
	'StructurePowerBank',
	'StructurePowerSpawn',
	'StructureRampart',
	'StructureRoad',
	'StructureSpawn',
	'StructureStorage',
	'StructureTerminal',
	'StructureTower',
	'StructureWall',
];
const ScreepsNameClassList = [Room, Flag];
export const instantiate = (memoryData, entryClass) => {
	let entry = undefined;
	try {
		if (_.includes(ScreepsIdClassList, entryClass)) {
			entry = new entryClass(memoryData.id);
			Object.assign(entry, memoryData);
		} else if (_.includes(ScreepsNameClassList, entryClass)) {
			entry = new entryClass(memoryData.name);
			Object.assign(entry, memoryData);
		} else {
			entry = new entryClass({ ...memoryData });
		}
	} catch (e) {
		throw e;
	} finally {
		return entry;
	}
};

export const checkObjectInGame = entry => {
	try {
		if (!entry) throw new Error('checkObjectInGame: entry is undefined');
		if (entry instanceof Creep) return !!Game.creeps[entry.name];
		else if (entry instanceof StructureSpawn) return !!Game.spawns[entry.name];
		else if (entry instanceof Room) return !!Game.rooms[entry.name];
		else if (_.includes(ScreepsIdClassList, entry.className)) {
			return !!Game.getObjectById(entry.id);
		} else if (_.includes(ScreepsNameClassList, entry.className)) {
			return !!new global[entry.className](entry.name);
		} else throw new Error(`the kind of entry is unknown: ${entry.className}`);
	} catch (e) {
		throw e;
	}
};
