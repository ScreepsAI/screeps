import { getUsername } from './utils';

export const Constants = {
	ME: getUsername(),
	MEMORY_RESYNC_INTERVAL: 500,
	MAX_REPAIR_LIMIT: {
		1: 1000,
		2: 1000,
		3: 2000,
		4: 4000,
		5: 8000,
		6: 15000,
		7: 20000,
		8: 40000,
	},
};
