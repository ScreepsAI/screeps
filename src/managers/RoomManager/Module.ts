import { Manager } from '../';

export abstract class RoomModule extends Manager {
	manager: RoomManager;

	protected constructor(namespace: string, manager: RoomManager) {
		super(namespace);
		this.manager = manager;
	}

	check(): boolean {
		return true;
	}

	// @ts-ignore
	checkPerRoom(room: Room): boolean {
		return true;
	}

	// @ts-ignore
	freshPerRoom(room: Room): void {}

	// @ts-ignore
	registerPerRoom(room: Room): void {}

	// @ts-ignore
	analyzePerRoom(room: Room): void {}

	// @ts-ignore
	runPerRoom(room: Room): void {}

	// @ts-ignore
	cleanupPerRoom(room: Room): void {}
}
