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
	_time: number;
	type: number;
}

interface Room {
	memory: RoomMemory;
	print: string;
	rcl: number;
	my: boolean;
	reservedByMe: boolean;
	canReserved: boolean;
	signedByMe: boolean;

	// constructionSite
	constructionSite: ConstructionSite[];

	// structures
	allStructures: Structure[];
	myStructures: Structure[];
	hostileStructures: Structure[];
	containers: StructureContainer[];
	extensions: StructureExtension[];
	extractor: StructureExtractor | undefined;
	labs: StructureLab[];
	links: StructureLink[];
	nuker: StructureNuker | undefined;
	observer: StructureObserver | undefined;
	powerSpawn: StructurePowerSpawn | undefined;
	spawns: StructureSpawn[];
	freeSpawns: StructureSpawn[];
	storage: StructureStorage | undefined;
	terminal: StructureTerminal | undefined;
	roads: StructureRoad[];
	ramparts: StructureRampart[];
	walls: StructureWall[];
	KeeperLairs: StructureKeeperLair[];

	// Creeps
	allCreeps: Creep[];
	myCreeps: Creep[];
	hostileCreeps: Creep[];
	hasHostileCreeps: boolean;

	// Resources
	sources: Source[];
	mineral: Mineral | undefined;

	// Functions
	allStructuresFilter(type: string): Structure[];

	myStructuresFilter(type: string): Structure[];

	hostileStructuresFilter(type: string): Structure[];

	cacheFilter(key: string, objs: any[], filter: Function, timeout?: number): any[];

	cacheFind(type: number, timeout?: number): any[];
}
