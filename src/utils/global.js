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
	Creep,
	Structure,
	Source,
	Resource,
	Mineral,
	Nuke,
	ConstructionSite,
	Tombstone,
];
const ScreepsNameClassList = [Room, Flag];
export const instantiate = (memoryData, entryClass) => {
	let entry = undefined;
	if (_.includes(ScreepsIdClassList, entryClass)) {
		entry = new this.entryClass(memoryData.id);
		Object.assign(entry, memoryData);
	} else if (_.includes(ScreepsNameClassList, entryClass)) {
		entry = new this.entryClass(memoryData.name);
		Object.assign(entry, memoryData);
	} else {
		entry = new entryClass({ ...memoryData });
	}
	if (entry === undefined) throw new Error('instantiate entry fail');
	return entry;
};
