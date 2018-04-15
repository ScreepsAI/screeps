global['getObjByIds'] = (idArray: string[]): RoomObject[] => {
	const GameObjects = [] as any[];
	_.forEach(idArray, id => GameObjects.push(Game.getObjectById(id)));
	return _.compact(GameObjects);
};

global['toIds'] = (objs: any[]) => {
	return _.map(objs, 'id');
};
