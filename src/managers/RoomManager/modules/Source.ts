import { RoomModule } from '../Module';

export class RoomSource extends RoomModule {
	constructor(manager: RoomManager) {
		super('RoomSource', manager);
	}

	analyzePer(room: Room): void {
		if (State.firstLoop || this.manager.needFreshMemory) this.saveSources(room);
	}

	private saveSources(room: Room) {
		_.set(room.memory, 'sources', {});
		_.forEach(room.resources.sources, s => {
			room.memory.sources[s.id] = {
				accessibleFields: s.accessibleFields,
				container: s.container,
				link: s.link,
			};
		});
	}
}
