export class RoomResouce {
	room: Room;

	constructor(room: Room) {
		this.room = room;
	}

	// ////////////////////////////////////////////////////////////////////
	// cache
	// ////////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) this[`_${key}`] = func();
		return this[`_${key}`];
	}

	// ////////////////////////////////////////////////////////////////////
	// extend
	// ////////////////////////////////////////////////////////////////////

	get sources(): Source[] {
		return this.cache('sources', () => this.room.find(FIND_SOURCES));
	}

	get minerals(): Mineral[] {
		return this.cache('minerals', () => this.room.find(FIND_MINERALS));
	}
}
