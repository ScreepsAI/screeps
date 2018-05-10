import { Manager } from '../';
import { GameEvent } from '../../lib';

export class RoomManager extends Manager {
	rooms: { [roomName: string]: Room };
	memory: { [roomName: string]: RoomMemory };

	constructor() {
		super('RoomManager');
		if (_.isUndefined(Memory.rooms)) Memory.rooms = {};
	}

	events = {
		sitesChange: new GameEvent(require('./Event').sitesChange),
		structuresChanged: new GameEvent(require('./Event').structuresChanged),
	};

	modules = {
		source: new (require('./modules/Source')).RoomSource(this),
		spawn: new (require('./modules/Spawn')).RoomSpawn(this),
	};

	// ////////////////////////////////////////////////////////////////////
	// Manager
	// ////////////////////////////////////////////////////////////////////

	fresh(): void {
		// constructor
		this.rooms = Game.rooms;
		this.memory = Memory.rooms;

		// global
		_.forEach(this.events, event => event.fresh());
		this.roomMoudle('fresh');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// memory.root
			if (_.isUndefined(room.memory.root)) room.memory.root = Game.time;
			// memory.check
			room.memory.check = Game.time;
			// module
			this.roomMoudlePer(room, 'fresh');
		});
	}

	register(): void {
		// global
		this.events.structuresChanged.on((room: Room) => {
			room.memory.structuresCount = room.structures.count;
		});
		this.roomMoudle('register');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// module
			this.roomMoudlePer(room, 'register');
		});
	}

	analyze(): void {
		// global
		this.roomMoudle('analyze');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// module
			this.roomMoudlePer(room, 'analyze');
		});
	}

	run(): void {
		// global
		this.roomMoudle('run');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// event
			_.forEach(this.events, event => event.handle(room));
			// module
			this.roomMoudlePer(room, 'run');
		});
	}

	cleanup(): void {
		// global
		this.roomMoudle('cleanup');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// module
			this.roomMoudlePer(room, 'cleanup');
		});

		// memory
		_.forEach(this.memory, (room: RoomMemory, roomName: string) => {
			// 超过一天不可见则在内存中清除此房间
			if (room.check && Game.time - room.check > 3600 * 24) delete Memory.rooms[roomName];
		});
	}

	// ////////////////////////////////////////////////////////////////////
	// Other
	// ////////////////////////////////////////////////////////////////////

	private roomMoudle(prototype: string): void {
		_.forEach(this.modules, module => {
			if (module.check()) module[prototype]();
		});
	}

	private roomMoudlePer(room: Room, prototype: string): void {
		_.forEach(this.modules, module => {
			if (module.checkPer(room)) module[prototype + 'Per'](room);
		});
	}

	get needFreshMemory(): boolean {
		return Game.time % MEMORY_RESYNC_INTERVAL === 0;
	}
}
