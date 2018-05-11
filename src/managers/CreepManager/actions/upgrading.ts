import { CreepAction } from '../Action';

export class ActionUpgrading extends CreepAction {
	constructor(manager: CreepManager) {
		super('upgrading', manager);
	}

	targetRange = 3;
	reachedRange = 3;

	work(creep: Creep) {
		return creep.upgradeController(<StructureController>creep.target);
	}

	checkAction(creep: Creep): boolean {
		return creep.carry.energy > 0;
	}

	checkTarget(target: StructureController): boolean {
		return target && target.structureType === 'controller' && target.my;
	}

	getNewTarget(creep: Creep): StructureController | null {
		const controller = creep.room.controller;
		return controller || null;
	}
}
