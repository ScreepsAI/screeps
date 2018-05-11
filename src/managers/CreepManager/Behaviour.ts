import { Module } from '../';

export abstract class CreepBehaviour extends Module {
	manager: CreepManager;

	protected constructor(namespace: string, manager: CreepManager) {
		super(namespace);
		this.manager = manager;
	}

	abstract handleState(creep: Creep): void;

	abstract actions(creep: Creep): CreepAction[];

	runPer(creep: Creep): void {
		let busy = false;
		if (creep.memory.actionName) busy = this.manager.actions[creep.memory.actionName].runPer(creep);
		if (busy) return;
		this.handleState(creep);
		_.forEach(this.actions(creep), action => {
			if (busy) return;
			busy = action.runPer(creep);
		});
	}
}
