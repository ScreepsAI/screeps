global['getObjByIds'] = idArray => {
	const GameObjects = [];
	_.forEach(idArray, id => GameObjects.push(Game.getObjectById(id)));
	return _.compact(GameObjects);
};

global['toIds'] = objs => {
	return _.map(objs, 'id');
};
