interface LookForCache {
	time: number;
	value: any[];
}

interface Pos {
	x: number;
	y: number;
	roomName: string;
}

interface RoomPosition {
	raw: Pos;
	room: Room;
	memory: RoomMemory;
	terrain: Terrain;
	structures: Structure[];
	mainStructure: Structure | undefined;
	constructionSite: ConstructionSite | undefined;
	creep: Creep | undefined;
	canMoveThrough: boolean;
	canBuild: boolean;

	getAdjacent(range?: number): RoomPosition[];
	getRawAdjacent(range?: number): any[];

	getAccessibleFields(range?: number): RoomPosition[];
	getRawAccessibleFields(range?: number): any[];

	// getStructure(type: StructureConstant): Structure | undefined;

	// getPositionInDirection(direction: number): RoomPosition;

	// cacheLookFor(type: LookConstant, timeout?: number): any[];
}
