import { CreepBehaviour } from '../Behaviour';

export class WorkerBehaviour extends CreepBehaviour {
	constructor(manager: CreepManager) {
		super('worker', manager);
	}

	get stateMachine() {
		const Action = this.manager.actions;
		return {
			onNeedEnergy: [Action.harvesting],
			onWork: [Action.upgrading],
		};
	}

	actions(creep: Creep) {
		if (creep.carry.energy === 0) creep.memory.state = 'onNeedEnergy';
		if (creep.sum === creep.carryCapacity) creep.memory.state = 'onWork';
		return creep.memory.state ? this.stateMachine[creep.memory.state] : [];
	}
}
