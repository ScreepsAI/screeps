import { Manager } from '../';
import { GameEvent } from '../../lib';

export class RoomManager extends Manager {
	rooms: { [roomName: string]: Room };
	memory: { [roomName: string]: RoomMemory };

	constructor() {
		super('RoomManager');
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
		this.roomMoudles('fresh');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// memory.root
			if (_.isUndefined(room.memory.root)) room.memory.root = Game.time;
			// memory.check
			room.memory.check = Game.time;
			// module
			this.roomMoudlesPerRoom('freshPerRoom', room);
		});
	}

	register(): void {
		// global
		this.events.structuresChanged.on((room: Room) => {
			room.memory.structuresCount = room.structures.count;
		});
		this.roomMoudles('register');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// module
			this.roomMoudlesPerRoom('registerPerRoom', room);
		});
	}

	analyze(): void {
		// global
		this.roomMoudles('analyze');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// module
			this.roomMoudlesPerRoom('analyzePerRoom', room);
		});
	}

	run(): void {
		// global
		this.roomMoudles('run');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// event
			_.forEach(this.events, event => event.handle(room));
			// module
			this.roomMoudlesPerRoom('runPerRoom', room);
		});
	}

	cleanup(): void {
		// global
		this.roomMoudles('cleanup');

		// room
		_.forEach(this.rooms, (room: Room) => {
			// module
			this.roomMoudlesPerRoom('cleanupPerRoom', room);
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

	private roomMoudles(func: string): void {
		_.forEach(this.modules, module => {
			if (module.check()) module[func]();
		});
	}

	private roomMoudlesPerRoom(func: string, room: Room): void {
		_.forEach(this.modules, module => {
			if (module.checkPerRoom(room)) module[func](room);
		});
	}

	get needFreshMemory(): boolean {
		return Game.time % MEMORY_RESYNC_INTERVAL === 0;
	}
}
