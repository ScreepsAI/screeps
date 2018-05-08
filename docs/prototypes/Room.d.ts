interface RoomMemory {
	structures: RoomStructureMemory
	creeps: RoomCreepMemory
	spawnQueue: any[]
	structuresCount: number;
	root: number
	check: number
}

interface Room {
	print: string;
	my: boolean;
	structures: RoomStructure
	creeps: RoomCreep
	constructionSites: ConstructionSite[]
	sources: Source[]
	minerals: Mineral[]
	spawns: StructureSpawn[]
}