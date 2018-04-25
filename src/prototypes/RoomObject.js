/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description:
 */

class RoomObjectExtend extends RoomObject {
	get entries() {
		return this.pos.look();
	}
	get terrain() {
		return this.pos.lookFor(LOOK_TERRAIN);
	}
	get structures() {
		return this.pos.lookFor(LOOK_STRUCTURES);
	}
}
Object.defineProperties(
	RoomObject.prototype,
	Object.getOwnPropertyDescriptors(RoomObjectExtend.prototype),
);
