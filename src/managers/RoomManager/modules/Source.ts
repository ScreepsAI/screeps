import { RoomModule } from '../Module';

export class RoomSource extends RoomModule {
	constructor(manager: RoomManager) {
		super('RoomSource', manager);
	}

	analyzePerRoom(room: Room): void {
		if (State.firstLoop || this.manager.needFreshMemory) this.saveSources(room);
	}

	private saveSources(room: Room) {
		if (_.isUndefined(room.sources)) room.sources = {};
		_.forEach(room.resources.sources, s => {
			room.sources[s.id] = {
				accessibleFields: s.accessibleFields,
				link: null,
				container: null,
			};
		});
	}
}
