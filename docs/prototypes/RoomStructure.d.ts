interface RoomStructure {
	count:number

	all: Structure[]

	my: Structure[]

	towers: StructureTower[]

	containers: StructureContainer[]

	links: StructureLink[]

	labs: StructureLab[]

	extensions: StructureExtension[]

	walls: StructureWall[]

	ramparts: StructureRampart[]

	spawns: StructureSpawn[]

	powerSpawns: StructurePowerSpawn[]

	nukers: StructureNuker[]

	observers: StructureObserver[]

	roads: StructureRoad[]

	storages: StructureStorage[]

	terminals: StructureTerminal[]

	keeperLairs: StructureKeeperLair[]

	powerBanks: StructurePowerBank[]

	portals: StructurePortal[]
}