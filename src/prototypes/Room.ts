import * as _ from 'lodash';
import { define } from '../utils/global';

Object.defineProperties(Room.prototype, {
	// ////////////////////////////////
	// Logging
	// ////////////////////////////////
	print: {
		get(): string {
			return '<a href="#!/room/' + Game.shard.name + '/' + this.name + '">' + this.name + '</a>';
		},
	},
	// ////////////////////////////////
	// Short Hand
	// ////////////////////////////////
	rcl: {
		get(): string {
			return this.controller.level;
		},
	},
	my: {
		get(): boolean {
			return this.controller.my;
		},
	},
	owner: {
		get(): boolean {
			return this.controller.owner;
		},
	},
	// canReserve: {
	// 	get(): boolean {
	// 		return (
	// 			this.controller &&
	// 			!_.get(this.controller, 'owner.username') &&
	// 			!_.get(this.controller, 'reservation.username')
	// 		);
	// 	},
	// },
	// reservedByMe: {
	// 	get(): boolean {
	// 		return _.get(this.controller, 'reservation.username') === ME;
	// 	},
	// },

	// signedByMe: {
	// 	get(): boolean {
	// 		return this.controller && this.controller.sign && this.controller.sign.text === CONTROLLER_SIGN_MESSAGE;
	// 	},
	// },

	// constructionSites
	// constructionSites: {
	// 	get(): ConstructionSite[] {
	// 		return this.cacheFind(FIND_MY_CONSTRUCTION_SITES);
	// 	},
	// },

	// Structures
	// allStructures: {
	// 	get(): Structure[] {
	// 		return this.cacheFind(FIND_STRUCTURES);
	// 	},
	// },
	// myStructures: {
	// 	get(): Structure[] {
	// 		return this.cacheFind(FIND_MY_STRUCTURES);
	// 	},
	// },
	// hostileStructures: {
	// 	get(): Structure[] {
	// 		return this.cacheFind(FIND_HOSTILE_STRUCTURES);
	// 	},
	// },
	// containers: {
	// 	get(): StructureContainer[] {
	// 		return this.myStructuresFilter(STRUCTURE_CONTAINER);
	// 	},
	// },
	// extensions: {
	// 	get(): StructureExtension[] {
	// 		return this.myStructuresFilter(STRUCTURE_EXTENSION);
	// 	},
	// },
	// extractor: {
	// 	get(): StructureExtractor | undefined {
	// 		return this.myStructuresFilter(STRUCTURE_EXTRACTOR)[0];
	// 	},
	// },
	// labs: {
	// 	get(): StructureLab[] {
	// 		return this.myStructuresFilter(STRUCTURE_LAB);
	// 	},
	// },
	// links: {
	// 	get(): StructureLink[] {
	// 		return this.myStructuresFilter(STRUCTURE_LINK);
	// 	},
	// },
	// nuker: {
	// 	get(): StructureNuker | undefined {
	// 		return this.myStructuresFilter(STRUCTURE_NUKER)[0];
	// 	},
	// },
	// observer: {
	// 	get(): StructureObserver | undefined {
	// 		return this.myStructuresFilter(STRUCTURE_OBSERVER)[0];
	// 	},
	// },
	// powerSpawn: {
	// 	get(): StructurePowerSpawn | undefined {
	// 		return this.myStructuresFilter(STRUCTURE_POWER_SPAWN)[0];
	// 	},
	// },
	// spawns: {
	// 	get(): StructureSpawn[] {
	// 		return this.myStructuresFilter(STRUCTURE_SPAWN);
	// 	},
	// },
	// freeSpawns: {
	// 	get(): StructureSpawn[] {
	// 		return _.filter(this.spawns, spawn => !spawn.spawning);
	// 	},
	// },
	// storage: {
	// 	get(): StructureStorage | undefined {
	// 		return this.myStructuresFilter(STRUCTURE_STORAGE)[0];
	// 	},
	// },
	// terminal: {
	// 	get(): StructureTerminal | undefined {
	// 		return this.myStructuresFilter(STRUCTURE_TERMINAL)[0];
	// 	},
	// },
	// roads: {
	// 	get(): StructureRoad[] {
	// 		return this.allStructuresFilter(STRUCTURE_ROAD);
	// 	},
	// },
	// ramparts: {
	// 	get(): StructureRampart[] {
	// 		return this.allStructuresFilter(STRUCTURE_RAMPART);
	// 	},
	// },
	// walls: {
	// 	get(): StructureWall[] {
	// 		return this.allStructuresFilter(STRUCTURE_WALL);
	// 	},
	// },
	// KeeperLairs: {
	// 	get(): StructureKeeperLair[] {
	// 		return this.allStructuresFilter(STRUCTURE_KEEPER_LAIR);
	// 	},
	// },
	// Creep
	// allCreeps: {
	// 	get(): Creep[] {
	// 		return this.cacheFind(FIND_CREEPS);
	// 	},
	// },
	// myCreeps: {
	// 	get(): Creep[] {
	// 		return this.cacheFind(FIND_MY_CREEPS);
	// 	},
	// },
	// hostileCreeps: {
	// 	get(): Creep[] {
	// 		return this.cacheFind(FIND_HOSTILE_CREEPS);
	// 	},
	// },
	// hasHostileCreeps: {
	// 	get(): boolean {
	// 		return this.hostileCreeps().length > 0;
	// 	},
	// },

	// Resources
	// sources: {
	// 	get(): Source[] {
	// 		return this.cacheFind(FIND_SOURCES, Infinity);
	// 	},
	// },
	// mineral: {
	// 	get(): Mineral | undefined {
	// 		return this.cacheFind(FIND_MINERALS)[0];
	// 	},
	// },
});

// ////////////////////////////////
// Functions
// ////////////////////////////////
// Room.prototype.allStructuresFilter = function(type: string): Structure[] {
// 	return this.cacheFilter(`as_${type}`, this.allStructures, (s: Structure) => s.structureType === type);
// };
// Room.prototype.myStructuresFilter = function(type: string): Structure[] {
// 	return this.cacheFilter(`ms_${type}`, this.myStructures, (s: Structure) => s.structureType === type);
// };
// Room.prototype.hostileStructuresFilter = function(type: string): Structure[] {
// 	return this.cacheFilter(`hs_${type}`, this.hostileStructures, (s: Structure) => s.structureType === type);
// };
// Room.prototype.getRole = function(type: RoleType): Creep[] {
// 	const CreepList: Creep[] = [];
// 	const roleToc = _.get(this.memory, ['creepToc', type]);
// 	if (_.isUndefined(roleToc)) return [];
// 	_.forEach(_.get(this.memory, ['creepToc', type]), (name: string) => {
// 		CreepList.push(Game.creeps[name]);
// 	});
// 	return _.compact(CreepList);
// };
// Room.prototype.getRoleCount = function(type: RoleType): number {
// 	const roleToc = _.get(this.memory, ['creepToc', type]) as string[];
// 	if (_.isUndefined(roleToc)) return 0;
// 	return roleToc.length;
// };

// ////////////////////////////////
// Cahce
// ////////////////////////////////
// Room.prototype.cacheFilter = function(key: string, objs: any[], filter: Function, timeout: number = 1): any[] {
// 	const cacheResult = _.get(this.memory, ['_filter', key]) as FilterCache;
// 	if (!_.isUndefined(cacheResult) && Game.time - cacheResult.time <= timeout) {
// 		return global.getObjByIds(cacheResult.value);
// 	}
// 	// 重新find
// 	const result = _.filter(objs, filter);
// 	_.set(this.memory, ['_filter', key], {
// 		time: Game.time,
// 		value: global.toIds(result),
// 	});
// 	return result;
// };
// Room.prototype.cacheFind = function(type: number, timeout: number = 1): any[] {
// 	if (type === (FIND_SOURCES || FIND_MINERALS)) timeout = Infinity;
// 	const isExit = type === (FIND_EXIT_TOP || FIND_EXIT_RIGHT || FIND_EXIT_BOTTOM || FIND_EXIT_LEFT || FIND_EXIT);
// 	const cacheResult = _.get(this.memory, ['_find', type]) as FindCache;
// 	if (!_.isUndefined(cacheResult) && Game.time - cacheResult.time <= timeout) {
// 		return isExit ? cacheResult.value : global.getObjByIds(cacheResult.value);
// 	}
// 	// 重新find
// 	const result = this.find(type);
// 	_.get(this.memory, ['_find', type], {
// 		time: Game.time,
// 		value: isExit ? result : global.toIds(result),
// 	});
// 	return result;
// };

const roomFilter = function(o: Creep | OwnedStructure) {
	return o && o.room.name === this.name;
};
const myFilter = function(o: Creep | OwnedStructure) {
	return o && o.room.name === this.name && o.my;
};
const allyFilter = function(o: Creep | OwnedStructure) {
	return o && o.room.name === this.name && Memory.config.WHITELIST.indexOf(o.owner.username) >= 0;
};
const hostileFilter = function(o: Creep | OwnedStructure) {
	return o && o.room.name === this.name && !o.my && Memory.config.WHITELIST.indexOf(o.owner.username) < 0;
};
define(Room.prototype, {
	/**
	 * 当前存量|可存量 = spawn + extension
	 */
	energy: {
		kinds: [],
		filter: function() {
			return (
				_.sumBy(this.mySpawn, (spawn: StructureSpawn) => spawn.energy) +
				_.sumBy(this.myExtension, (extension: StructureExtension) => extension.energy)
			);
		},
	},
	energyCapacity: {
		kinds: [],
		filter: function() {
			return (
				_.sumBy(this.mySpawn, (spawn: StructureSpawn) => spawn.energyCapacity) +
				_.sumBy(this.myExtension, (extension: StructureExtension) => extension.energyCapacity)
			);
		},
	},
	creep: {
		kinds: ['my'],
		filter: {
			my: function() {
				return _.filter(Game.creeps, myFilter.bind(this));
			},
		},
	},
	source: {
		kinds: [],
		filter: function() {
			return _.filter(SourceManager.entries, roomFilter.bind(this));
		},
	},
	spawn: {
		kinds: ['my', 'ally', 'hostile'],
		filter: {
			my: function() {
				return _.filter(SpawnManager.entries, myFilter.bind(this));
			},
			ally: function() {
				return _.filter(SpawnManager.entries, allyFilter.bind(this));
			},
			hostile: function() {
				return _.filter(SpawnManager.entries, hostileFilter.bind(this));
			},
		},
	},
	extension: {
		kinds: ['my', 'ally', 'hostile'],
		filter: {
			my: function() {
				return _.filter(ExtensionManager.entries, myFilter.bind(this));
			},
			ally: function() {
				return _.filter(ExtensionManager.entries, allyFilter.bind(this));
			},
			hostile: function() {
				return _.filter(ExtensionManager.entries, hostileFilter.bind(this));
			},
		},
	},
	constructionSite: {
		kinds: ['my', 'ally', 'hostile'],
		filter: {
			my: function() {
				return _.filter(ConstructionSiteManager.entries, myFilter.bind(this));
			},
			ally: function() {
				return _.filter(ConstructionSiteManager.entries, allyFilter.bind(this));
			},
			hostile: function() {
				return _.filter(ConstructionSiteManager.entries, hostileFilter.bind(this));
			},
		},
	},
	container: {
		kinds: [],
		filter: function() {
			return _.filter(ContainerManager.entries, roomFilter.bind(this));
		},
	}
});
