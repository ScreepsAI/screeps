interface Room {
	print: string;
	RCL: number;
	my: boolean;
	structures: RoomStructure
	creeps: RoomCreep
	resources: RoomResouce
	constructionSites: ConstructionSite[]
	sources: { [id: string]: any }
	minerals: { [id: string]: any }
	spawns: StructureSpawn[]
	freeSpawns: StructureSpawn[]
	population: {
		typeCount: { [type: string]: number },
		actionCount: { [type: string]: number },
	}
}