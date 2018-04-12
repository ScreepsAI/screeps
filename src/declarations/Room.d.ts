interface FindCache {
	time: number;
	value: any;
}

interface FilterCache {
	time: number;
	value: any;
}

interface RoomMemory {
	_find: any;
	_filter: any;
	_look: any;
	time: number;
	type: number;
	creepToc: { [type: number]: string[] };
	orders: any[];
}

interface Room {
	memory: RoomMemory;
	print: string;
	rcl: number;
	my: boolean;
	energy: number;
	energyCapacity: number;
	// reservedByMe: boolean;
	// canReserved: boolean;
	// signedByMe: boolean;

	// constructionSite
	constructionSites: ConstructionSite[];

	// structures
	mySpawn: StructureSpawn[];
	// allStructures: Structure[];
	// myStructures: Structure[];
	// hostileStructures: Structure[];
	// containers: StructureContainer[];
	// extensions: StructureExtension[];
	// extractor: StructureExtractor | undefined;
	// labs: StructureLab[];
	// links: StructureLink[];
	// nuker: StructureNuker | undefined;
	// observer: StructureObserver | undefined;
	// powerSpawn: StructurePowerSpawn | undefined;
	// spawns: StructureSpawn[];
	// freeSpawns: StructureSpawn[];
	// storage: StructureStorage | undefined;
	// terminal: StructureTerminal | undefined;
	// roads: StructureRoad[];
	// ramparts: StructureRampart[];
	// walls: StructureWall[];
	// KeeperLairs: StructureKeeperLair[];

	// Creeps
	// allCreeps: Creep[];
	myCreep: Creep[];
	allyCreep: Creep[];
	hostileCreep: Creep[];
	// hasHostileCreeps: boolean;

	// Resources
	source: Source[];
	// mineral: Mineral | undefined;

	// Functions
	// allStructuresFilter(type: string): Structure[];

	// myStructuresFilter(type: string): Structure[];

	// hostileStructuresFilter(type: string): Structure[];

	// getRole(type: number): Creep[];

	// getRoleCount(type: number): number;

	// cacheFilter(key: string, objs: any[], filter: Function, timeout?: number): any[];

	// cacheFind(type: number, timeout?: number): any[];
}
