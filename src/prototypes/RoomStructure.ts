export class RoomStructure {
	room: Room;
	memory: object;

	constructor(room: Room) {
		this.room = room;
		if (_.isUndefined(room.memory.structures)) room.memory.structures = {};
		this.memory = room.memory.structures;
	}

	// ////////////////////////////////////////////////////////////////////
	// cache
	// ////////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) this[`_${key}`] = func() || [];
		return this[`_${key}`];
	}

	private cacheFilter(type: StructureConstant) {
		return this.cache(type, () => _.filter(this.all, (s: Structure) => s.structureType === type));
	}

	// ////////////////////////////////////////////////////////////////////
	// extend
	// ////////////////////////////////////////////////////////////////////

	get count(): number {
		return this.cache('count', () => this.my.length);
	}

	get all(): Structure[] {
		return this.cache('all', () => this.room.find(FIND_STRUCTURES));
	}

	get my(): Structure[] {
		return this.cache('my', () => this.room.find(FIND_MY_STRUCTURES));
	}

	get towers(): StructureTower[] {
		return this.cacheFilter(STRUCTURE_TOWER);
	}

	get containers(): StructureContainer[] {
		return this.cacheFilter(STRUCTURE_CONTAINER);
	}

	get links(): StructureLink[] {
		return this.cacheFilter(STRUCTURE_LINK);
	}

	get labs(): StructureLab[] {
		return this.cacheFilter(STRUCTURE_LAB);
	}

	get extensions(): StructureExtension[] {
		return this.cacheFilter(STRUCTURE_EXTENSION);
	}

	get walls(): StructureWall[] {
		return this.cacheFilter(STRUCTURE_WALL);
	}

	get ramparts(): StructureRampart[] {
		return this.cacheFilter(STRUCTURE_RAMPART);
	}

	get spawns(): StructureSpawn[] {
		return this.cacheFilter(STRUCTURE_SPAWN);
	}

	get powerSpawns(): StructurePowerSpawn[] {
		return this.cacheFilter(STRUCTURE_POWER_SPAWN);
	}

	get nukers(): StructureNuker[] {
		return this.cacheFilter(STRUCTURE_NUKER);
	}

	get observers(): StructureObserver[] {
		return this.cacheFilter(STRUCTURE_OBSERVER);
	}

	get roads(): StructureRoad[] {
		return this.cacheFilter(STRUCTURE_ROAD);
	}

	get storages(): StructureStorage[] {
		return this.cacheFilter(STRUCTURE_STORAGE);
	}

	get terminals(): StructureTerminal[] {
		return this.cacheFilter(STRUCTURE_TERMINAL);
	}

	get keeperLairs(): StructureKeeperLair[] {
		return this.cacheFilter(STRUCTURE_KEEPER_LAIR);
	}

	get powerBanks(): StructurePowerBank[] {
		return this.cacheFilter(STRUCTURE_POWER_BANK);
	}

	get portals(): StructurePortal[] {
		return this.cacheFilter(STRUCTURE_PORTAL);
	}
}
