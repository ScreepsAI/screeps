import { Module } from '../';

export abstract class CreepBehaviour extends Module {
	manager: CreepManager;

	protected constructor(namespace: string, manager: CreepManager) {
		super(namespace);
		this.manager = manager;
	}
}
