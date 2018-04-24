import * as _ from 'lodash';
// import { define } from '../utils/global';
// import { ControllerManager } from 'managers/ControllerManager';

const roomFilter = function(o) {
	return o && o.room.name === this.name;
};
const myFilter = function(o) {
	return o && o.room.name === this.name && o.my;
};
const allyFilter = function(o) {
	return o && o.room.name === this.name && Memory.config.WHITELIST.indexOf(o.owner.username) >= 0;
};
const hostileFilter = function(o) {
	return (
		o && o.room.name === this.name && !o.my && Memory.config.WHITELIST.indexOf(o.owner.username) < 0
	);
};

class RoomExtend extends Room {
	get my() {
		return this.controller.my;
	}
	get rcl() {
		return this.controller.level;
	}
	get owner() {
		return this.controller.owner;
	}
	get energy() {
		return (
			_.sumBy(this.mySpawn, spawn => spawn.energy) +
			_.sumBy(this.myExtension, extension => extension.energy)
		);
	}
	get energyCapacity() {
		return (
			_.sumBy(this.mySpawn, spawn => spawn.energyCapacity) +
			_.sumBy(this.myExtension, extension => extension.energyCapacity)
		);
	}
	get source() {
		return _.filter(SourceManager.entries, roomFilter);
	}
	get container() {
		return _.filter(ContainerManager.entries, roomFilter);
	}
	get myCreep() {
		return _.filter(Game.creeps, myFilter);
	}
	get mySpawn() {
		return _.filter(SpawnManager.entries, myFilter);
	}
	get allySpawn() {
		return _.filter(SpawnManager.entries, allyFilter);
	}
	get hostileSpawn() {
		return _.filter(SpawnManager.entries, hostileFilter);
	}
	get myExtension() {
		return _.filter(ExtensionManager.entries, myFilter);
	}
	get allyExtension() {
		return _.filter(ExtensionManager.entries, allyFilter);
	}
	get hostileExtension() {
		return _.filter(ExtensionManager.entries, hostileFilter);
	}
	get myConstructionSite() {
		return _.filter(ConstructionSiteManager.entries, myFilter);
	}
	get allyConstructionSite() {
		return _.filter(ConstructionSiteManager.entries, allyFilter);
	}
	get hostileConstructionSite() {
		return _.filter(ConstructionSiteManager.entries, hostileFilter);
	}
}

Object.defineProperties(Room.prototype, Object.getOwnPropertyDescriptors(RoomExtend.prototype));
