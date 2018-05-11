import { CreepAction } from '../Action';

export class ActionHarvesting extends CreepAction {
	constructor(manager: CreepManager) {
		super('harvesting', manager);
	}

	work(creep: Creep) {
		const source = creep.target as Source;
		if (source.energy > 0) return creep.harvest(source);
		return OK;
	}

	checkAction(creep: Creep): boolean {
		return creep.sum < creep.carryCapacity;
	}

	checkTarget(target: Source): boolean {
		if (!target || !target.energy) return false;
		return true;
	}

	getNewTarget(creep: Creep): Source | null {
		const sources = _.filter(creep.room.sources, s => _.size(s.targetOf) < s.accessibleFields);
		switch (sources.length) {
			case 0:
				return null;
			case 1:
				return sources[0];
			default:
				return creep.pos.findClosestByRange(sources);
		}
	}
}
