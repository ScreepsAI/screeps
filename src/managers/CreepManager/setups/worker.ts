import { CreepSetup } from '../Setup';

export class WorkerSetup extends CreepSetup {
	constructor(manager: CreepManager) {
		super('worker', manager);
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
		if (!this.hasMinerOrHauler(room)) {
			room.RCL <= 2 ? _.forEach(room.sources, s => (count += s.accessibleFields.length)) : count++;
		}
		if (room.constructionSites.length > 0) count++;
		return count;
	}

	maxMultiWorker(room: Room, setup: RclSetup): number {
		return this.hasMinerOrHauler(room) ? this.maxMulti(room, setup) : this.minMulti(room, setup);
	}

	hasMinerOrHauler(room: Room): boolean {
		if (_.isUndefined(room.population)) return false;
		const { miner, hauler } = room.population.typeCount;
		const hasMiner = !_.isUndefined(miner) && miner > 0;
		const hasHauler = !_.isUndefined(hauler) && hauler > 0;
		return hasMiner || hasHauler;
	}

	// ////////////////////////////////////////////////////////////////////
	// Other
	// ////////////////////////////////////////////////////////////////////
}
