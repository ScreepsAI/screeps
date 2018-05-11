import { Module } from '../';

export abstract class CreepBehaviour extends Module {
	manager: CreepManager;

	protected constructor(namespace: string, manager: CreepManager) {
		super(namespace);
		this.manager = manager;
	}

	abstract actions(creep: Creep): CreepAction[];

	runPer(creep: Creep): void {
		let busy = false;
		if (creep.action) busy = creep.action.runPer(creep);
		if (busy) return;
		_.forEach(this.actions(creep), action => {
			if (busy) return;
			busy = action.runPer(creep);
		});
	}
}
