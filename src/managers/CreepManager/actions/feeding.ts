import { CreepAction } from '../Action';

export class ActionFeeding extends CreepAction {
	constructor(manager: CreepManager) {
		super('feeding', manager);
	}

	maxPerTarget = 1;

	work(creep: Creep) {
		return creep.transfer(<StructureExtension | StructureSpawn>creep.target, RESOURCE_ENERGY);
	}

	checkAction(creep: Creep): boolean {
		return creep.carry.energy > 0 && creep.room.energyAvailable < creep.room.energyCapacityAvailable;
	}

	checkTarget(target: StructureExtension | StructureSpawn): boolean {
		return target && target.energy < target.energyCapacity;
	}

	getNewTarget(creep: Creep): StructureExtension | StructureSpawn | null {
		const feedables = _.filter(creep.room.feedable, s => {
			if (_.size(s.targetOf) < this.maxPerTarget) return true;
			const targetEnergy = _.sum(_.map(s.targetOf, 'carry.energy'));
			return targetEnergy < s.energyCapacity - s.energy;
		});
		switch (feedables.length) {
			case 0:
				return null;
			case 1:
				return feedables[0];
			default:
				return creep.pos.findClosestByRange(feedables);
		}
	}
}
