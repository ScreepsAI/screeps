interface RoomPosition {
	adjacent: RoomPosition[];
	terrain: Terrain;
	structures: Structure[];
	constructionSites: ConstructionSite[];
	creeps: Creep[];
	accessible: boolean;
	walkable: boolean

	radius(radius: number): RoomPosition[];

	direction(direction: number): RoomPosition;
}

interface Pos {
	x: number,
	y: number,
	roomName?: string
}