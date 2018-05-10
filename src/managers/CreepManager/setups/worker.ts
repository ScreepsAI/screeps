import { CreepSetup } from '../Setup';

export class WorkerSetup extends CreepSetup {
	constructor(manager: CreepManager) {
		super('worker', manager);
	}

	checkPer(room: Room): boolean {
		if (!room.my || room.RCL < this.minControllerLevel || room.freeSpawns.length === 0) return false;
		if (room.RCL >= 2 && !room.hasMinerOrHauler && room.spawnQueue['worker'].cost > room.energyAvailable) return true;
		return _.isUndefined(room.spawnQueue['worker']);
	}

	// ////////////////////////////////////////////////////////////////////
	// Setup
	// ////////////////////////////////////////////////////////////////////

	low = {
		multiBody: {
			[CARRY]: 1,
			[WORK]: 1,
			[MOVE]: 2,
		},
		maxMulti: (room: Room, setup: RclSetup) => this.maxMultiWorker(room, setup),
		maxCount: (room: Room) => this.maxCountWorker(room),
	};

	default = {
		multiBody: {
			[CARRY]: 1,
			[WORK]: 1,
			[MOVE]: 1,
		},
		maxMulti: (room: Room, setup: RclSetup) => this.maxMultiWorker(room, setup),
		maxCount: (room: Room) => this.maxCountWorker(room),
	};

	RCL: RCL = {
		1: this.low,
		2: this.low,
		3: this.default,
		4: this.default,
		5: this.default,
		6: this.default,
		7: this.default,
		8: this.default,
	};

	maxCountWorker(room: Room): number {
		let count = 0;
		if (!room.hasMinerOrHauler) {
			room.RCL <= 2 ? _.forEach(room.sources, s => (count += s.accessibleFields)) : count++;
		}
		if (room.constructionSites.length > 0) count++;
		return count;
	}

	maxMultiWorker(room: Room, setup: RclSetup): number {
		return room.hasMinerOrHauler ? this.maxMulti(room, setup) : this.minMulti(room, setup);
	}

	// ////////////////////////////////////////////////////////////////////
	// Other
	// ////////////////////////////////////////////////////////////////////
}
