import { RoomModule } from '../Module';

export class RoomSpawn extends RoomModule {
	constructor(manager: RoomManager) {
		super('RoomSpawn', manager);
	}

	// ////////////////////////////////////////////////////////////////////
	// Module
	// ////////////////////////////////////////////////////////////////////

	checkPerRoom(room: Room): boolean {
		return room.my;
	}

	register(): void {
		this.manager.events.structuresChanged.on(this.saveSpawn);
	}

	registerPerRoom(room: Room): void {
		if (_.isUndefined(room.memory.spawnQueue)) room.memory.spawnQueue = [];
	}

	analyzePerRoom(room: Room): void {
		if (State.firstLoop || this.manager.needFreshMemory) this.saveSpawn(room);
	}

	runPerRoom(room: Room): void {
		const spawns = _.filter(room.spawns, s => !s.spawning);
		if (spawns.length === 0) return;
		const spawnQueue = room.memory.spawnQueue;
		_.forEach(spawns, s => {});
	}

	// ////////////////////////////////////////////////////////////////////
	// Other
	// ////////////////////////////////////////////////////////////////////

	private saveSpawn(room: Room): void {
		_.set(room.memory, ['spawns'], _.map(room.structures.spawns, 'id'));
	}
}
