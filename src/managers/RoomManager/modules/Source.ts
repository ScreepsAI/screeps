import { RoomModule } from '../Module';

export class RoomSource extends RoomModule {
	constructor(manager: RoomManager) {
		super('RoomSource', manager);
	}

	register(): void {}

	analyzePerRoom(room: Room): void {}
}
