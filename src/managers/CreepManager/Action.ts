import { Manager } from '../';

export abstract class CreepAction extends Manager {
	manager: CreepManager;

	protected constructor(namespace: string, manager: RoomManager) {
		super(namespace);
		this.manager = manager;
	}
}
