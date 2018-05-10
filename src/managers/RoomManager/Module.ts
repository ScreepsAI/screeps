import { Module } from '../';

export abstract class RoomModule extends Module {
	manager: RoomManager;

	protected constructor(namespace: string, manager: RoomManager) {
		super(namespace);
		this.manager = manager;
	}
}
