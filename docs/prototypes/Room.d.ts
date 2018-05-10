interface Room {
	population: {
		behaviourCount: { [type: string]: number },
		actionCount: { [type: string]: number },
	}

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
	hasMinerOrHauler:boolean
	getBehaviourCount(behaviour: string): number
	getActionCount(action: string): number

	spawnQueue:  { [behaviour: string]: SpawnOrder }
	addSpawnQueue(order: SpawnOrder):void

	center: Pos

	setCenter(center?: number | Pos, centerY?: number): void
}