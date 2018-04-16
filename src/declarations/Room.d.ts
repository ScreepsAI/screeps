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
	print: string;
	rcl: number;
	my: boolean;
	energy: number;
	energyCapacity: number;
	/**
	 * 记录一个房间内的固定路径，如容器到资源点的最短路径
	 */
	paths: any[];

	// constructionSite
	constructionSites: ConstructionSite[];

	// structures
	mySpawn: StructureSpawn[];
	myExtension: StructureExtension[];
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
	myCreep: Creep[];
	allyCreep: Creep[];
	hostileCreep: Creep[];

	// Resources
	source: Source[];
	container: StructureContainer[];
	// mineral: Mineral | undefined;

	// Functions
}
