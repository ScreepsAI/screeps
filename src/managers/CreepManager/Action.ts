import { Module } from '../index';

export abstract class CreepAction extends Module {
	manager: CreepManager;

	protected constructor(namespace: string, manager: CreepManager) {
		super(namespace);
		this.manager = manager;
	}
}
