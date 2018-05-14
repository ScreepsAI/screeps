import _ from 'lodash';

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
	try {
		return (
			o &&
			o.room.name === this.name &&
			!o.my &&
			Memory.config.WHITELIST.indexOf(o.owner.username) < 0
		);
	} catch (e) {}
};
Room.existCheckKeyArray = ['name'];
Room.className = 'Room';
Room.prototype.className = 'Room';
Object.defineProperties(Room.prototype, {
	UUID: {
		writable: true,
		enumerable: true,
		value: undefined,
	},
	raw: {
		get: function() {
			return _.pick(this, this.paramsList);
		},
	},
	paramsList: {
		enumerable: true,
		get: () => ['UUID', 'name'],
	},
	my: {
		enumerable: true,
		get: function() {
			return this.controller.my;
		},
	},
	rcl: {
		enumerable: true,
		get: function() {
			return this.controller.level;
		},
	},
	owner: {
		enumerable: true,
		get: function() {
			return this.controller.owner;
		},
	},
	controller: {
		get: function() {
			const controller = _.filter(ControllerManager.entries, roomFilter.bind(this));
			if (controller && controller.length > 0) {
				this._controller = controller[0];
			}
			return this._controller;
		},
		set: function(v) {
			this._controller = v;
		},
	},
	sources: {
		get: function() {
			return _.filter(SourceManager.entries, roomFilter.bind(this));
		},
	},
	container: {
		get: function() {
			return _.filter(ContainerManager.entries, roomFilter.bind(this));
		},
	},
	myCreeps: {
		get: function() {
			return _.filter(CreepManager.entries, myFilter.bind(this));
		},
	},
	allyCreeps: {
		get: function() {
			return _.filter(CreepManager.entries, allyFilter.bind(this));
		},
	},
	hostileCreeps: {
		get: function() {
			return _.filter(CreepManager.entries, hostileFilter.bind(this));
		},
	},
	mySpawns: {
		get: function() {
			return _.filter(SpawnManager.entries, myFilter.bind(this));
		},
	},
	allySpawns: {
		get: function() {
			return _.filter(SpawnManager.entries, allyFilter.bind(this));
		},
	},
	hostileSpawns: {
		get: function() {
			return _.filter(SpawnManager.entries, hostileFilter.bind(this));
		},
	},
	myExtensions: {
		get: function() {
			return _.filter(ExtensionManager.entries, myFilter.bind(this));
		},
	},
	allyExtensions: {
		get: function() {
			return _.filter(ExtensionManager.entries, allyFilter.bind(this));
		},
	},
	hostileExtensions: {
		get: function() {
			return _.filter(ExtensionManager.entries, hostileFilter.bind(this));
		},
	},
	myConstructionSites: {
		get: function() {
			return _.filter(ConstructionSiteManager.entries, myFilter.bind(this));
		},
	},
	allyConstructionSites: {
		get: function() {
			return _.filter(ConstructionSiteManager.entries, allyFilter.bind(this));
		},
	},
	hostileConstructionSites: {
		get: function() {
			return _.filter(ConstructionSiteManager.entries, hostileFilter.bind(this));
		},
	},
});
