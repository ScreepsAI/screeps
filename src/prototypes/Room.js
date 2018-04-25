import _ from 'lodash';
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
		return _.filter(SourceManager.entries, roomFilter.bind(this));
	}
	get container() {
		return _.filter(ContainerManager.entries, roomFilter.bind(this));
	}
	get myCreep() {
		return _.filter(Game.creeps, myFilter.bind(this));
	}
	get mySpawn() {
		return _.filter(SpawnManager.entries, myFilter.bind(this));
	}
	get allySpawn() {
		return _.filter(SpawnManager.entries, allyFilter.bind(this));
	}
	get hostileSpawn() {
		return _.filter(SpawnManager.entries, hostileFilter.bind(this));
	}
	get myExtension() {
		return _.filter(ExtensionManager.entries, myFilter.bind(this));
	}
	get allyExtension() {
		return _.filter(ExtensionManager.entries, allyFilter.bind(this));
	}
	get hostileExtension() {
		return _.filter(ExtensionManager.entries, hostileFilter.bind(this));
	}
	get myConstructionSite() {
		return _.filter(ConstructionSiteManager.entries, myFilter.bind(this));
	}
	get allyConstructionSite() {
		return _.filter(ConstructionSiteManager.entries, allyFilter.bind(this));
	}
	get hostileConstructionSite() {
		return _.filter(ConstructionSiteManager.entries, hostileFilter.bind(this));
	}
}

Object.defineProperties(Room.prototype, Object.getOwnPropertyDescriptors(RoomExtend.prototype));
