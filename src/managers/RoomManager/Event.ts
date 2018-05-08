const defaultValue = {
	count: 0,
	time: 0,
	isChange: true,
};

export const onSitesChange = (): boolean => {
	const totalSites = _.get(Memory.events, 'totalSites', defaultValue);
	const { time, count } = totalSites;
	if (Game.time !== time) {
		const newCount = _.size(Game.constructionSites);
		Memory.events.totalSites = {
			count: newCount,
			time: Game.time,
			isChange: count !== newCount,
		};
	}
	return Memory.events.totalSites.isChange;
};

export const onStructuresChanged = (): boolean => {
	const totalStructures = _.get(Memory.events, 'totalStructures', defaultValue);
	const { time, count } = totalStructures;
	if (Game.time !== time) {
		const newCount = _.size(Game.structures);
		Memory.events.totalStructures = {
			count: newCount,
			time: Game.time,
			isChange: count !== newCount,
		};
	}
	return Memory.events.totalStructures.isChange;
};
