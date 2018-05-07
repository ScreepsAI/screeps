import _ from 'lodash';
import { UUID } from '../utils/global';

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
	get UUID() {
		if (this._UUID === undefined) this._UUID = UUID();
		return this._UUID;
	}

	set UUID(v) {
		this._UUID = v;
	}

	get raw() {
		return _.pick(this, this.paramsList);
	}

	get existCheckKeyArray() {
		return ['name'];
	}

	get paramsList() {
		return ['UUID', 'name'];
	}

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

	get sources() {
		return _.filter(SourceManager.entries, roomFilter.bind(this));
	}

	get container() {
		return _.filter(ContainerManager.entries, roomFilter.bind(this));
	}

	get myCreeps() {
		return _.filter(CreepManager.entries, myFilter.bind(this));
	}

	get hostileCreeps() {
		return _.filter(CreepManager.entries, hostileFilter.bind(this));
	}

	get mySpawns() {
		return _.filter(SpawnManager.entries, myFilter.bind(this));
	}

	get allySpawns() {
		return _.filter(SpawnManager.entries, allyFilter.bind(this));
	}

	get hostileSpawns() {
		return _.filter(SpawnManager.entries, hostileFilter.bind(this));
	}

	get myExtensions() {
		return _.filter(ExtensionManager.entries, myFilter.bind(this));
	}

	get allyExtensions() {
		return _.filter(ExtensionManager.entries, allyFilter.bind(this));
	}

	get hostileExtensions() {
		return _.filter(ExtensionManager.entries, hostileFilter.bind(this));
	}

	get myConstructionSites() {
		return _.filter(ConstructionSiteManager.entries, myFilter.bind(this));
	}

	get allyConstructionSites() {
		return _.filter(ConstructionSiteManager.entries, allyFilter.bind(this));
	}

	get hostileConstructionSites() {
		return _.filter(ConstructionSiteManager.entries, hostileFilter.bind(this));
	}
}

Object.defineProperties(Room.prototype, Object.getOwnPropertyDescriptors(RoomExtend.prototype));
