interface RoomMemory {
	spawnQueue: { [behaviour: string]: SpawnOrder }
	structuresCount: number
	root: number
	check: number
	sources: {
		accessibleFields: number,
		link: string | null,
		container: string | null,
	}
	spawns: {
		direction: number | null
	}
}