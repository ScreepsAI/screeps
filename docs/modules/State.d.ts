declare const State: State;

interface State {
	cacheTime: number,
	firstLoop: boolean,
	totalSites: {
		count: number,
		time: number,
		isChange: boolean,
	}
	totalStructures: {
		count: number,
		time: number,
		isChange: boolean,
	}
}