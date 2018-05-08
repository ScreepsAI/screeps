export class RoomCreep {
	room: Room;
	memory: object;

	constructor(room: Room) {
		this.room = room;
		if (_.isUndefined(room.memory.creeps)) room.memory.creeps = {};
		this.memory = room.memory.creeps;
	}

	// ////////////////////////////////////////////////////////////////////
	// cache
	// ////////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) this[`_${key}`] = func() || [];
		return this[`_${key}`];
	}

	// ////////////////////////////////////////////////////////////////////
	// extend
	// ////////////////////////////////////////////////////////////////////

	get all(): Creep[] {
		return this.cache('all', () => this.room.find(FIND_CREEPS));
	}

	get my(): Creep[] {
		return this.cache('my', () => this.room.find(FIND_MY_CREEPS));
	}

	get hostiles(): Creep[] {
		return this.cache('hostiles', () => _.filter(this.room.find(FIND_HOSTILE_CREEPS), (c: Creep) => c.hostile));
	}
}
