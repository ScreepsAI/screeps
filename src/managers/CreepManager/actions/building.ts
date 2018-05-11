import { CreepAction } from '../Action';

export class ActionBuilding extends CreepAction {
	constructor(manager: CreepManager) {
		super('building', manager);
	}

	priority: { [type: string]: number };
	maxPerTarget = 3;
	maxPerAction = 3;
	targetRange = 3;
	reachedRange: 1;

	work(creep: Creep) {
		return creep.build(<ConstructionSite>creep.target);
	}

	checkAction(creep: Creep): boolean {
		return creep.carry.energy > 0;
	}

	checkTarget(target: ConstructionSite): boolean {
		return target && target.my && target.progress < target.progressTotal;
	}

	getNewTarget(creep: Creep): ConstructionSite | null {
		const constructionSites = _.filter(creep.room.constructionSites, s => _.size(s.targetOf) < this.maxPerTarget);
		let filter: ConstructionSite[] = [];
		if (creep.memory.behaviour === 'worker') {
			let find = false;
			_.forEach(CONSTRUCTION_PRIORITY, type => {
				if (find) return;
				filter = _.filter(constructionSites, s => s.structureType === type);
				if (filter.length > 0) find = true;
			});
		} else {
			filter = constructionSites;
		}
		switch (filter.length) {
			case 0:
				return null;
			case 1:
				return filter[0];
			default:
				return creep.pos.findClosestByRange(filter);
		}
	}
}
