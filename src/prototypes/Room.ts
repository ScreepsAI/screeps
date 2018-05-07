class RoomExtend extends Room {
	get print(): string {
		return Util.makeRoomUrl(this.name);
	}
}

export const install = () => Util.define(Room, RoomExtend);
