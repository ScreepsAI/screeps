import { CreepBehaviour } from '../Behaviour';

enum stateType {
	onNeedEnergy = 1,
	onWork = 10,
}

export class WorkerBehaviour extends CreepBehaviour {
	constructor(manager: CreepManager) {
		super('worker', manager);
	}

	handleState(creep: Creep): void {
		let state = creep.memory.state;
		if (!state && creep.carry.energy > 0) state = stateType.onNeedEnergy;
		if (creep.carry.energy === 0) state = stateType.onNeedEnergy;
		if (creep.sum === creep.carryCapacity) state = stateType.onWork;
		creep.memory.state = state;
	}

	actions(creep: Creep) {
		const Action = this.manager.actions;
		switch (creep.memory.state) {
			case stateType.onNeedEnergy:
				return [Action.harvesting];
			case stateType.onWork:
				return [Action.upgrading];
			default:
				delete creep.memory.state;
				return [];
		}
	}
}
