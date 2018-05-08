interface RoomPosition {
  adjacent: RoomPosition[];
  terrain: Terrain;
  structures: Structure[];
  constructionSites: ConstructionSite[];
  creeps: Creep[];
  accessible: boolean;

  radius(radius: number): RoomPosition[];

  direction(direction: number): RoomPosition;
}