const defaultValue = {
	count: 0,
	time: 0,
	isChange: true,
};

export const sitesChange = (): boolean => {
	const totalSites = _.get(State, 'totalSites', defaultValue);
	const { time, count } = totalSites;
	if (Game.time !== time) {
		const newCount = _.size(Game.constructionSites);
		State.totalSites = {
			count: newCount,
			time: Game.time,
			isChange: count !== newCount,
		};
	}
	return State.totalSites.isChange;
};

export const structuresChanged = (): boolean => {
	const totalStructures = _.get(State, 'totalStructures', defaultValue);
	const { time, count } = totalStructures;
	if (Game.time !== time) {
		const newCount = _.size(Game.structures);
		State.totalStructures = {
			count: newCount,
			time: Game.time,
			isChange: count !== newCount,
		};
	}
	return State.totalStructures.isChange;
};
