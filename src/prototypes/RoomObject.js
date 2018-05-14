/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description:
 */
// import _ from 'lodash';
// import { UUID } from '../utils/global';

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
	// 返回资源周围8格内walkable的坐标数组
	get accessibleFields() {
		const memory = SourceManager.getEntryFromMemory(this.id);
		if (memory && !memory.accessibleFields)
			memory.accessibleFields = this.pos.getAccessibleFields();

		return memory.accessibleFields;
	}
}
Object.defineProperties(
	RoomObject.prototype,
	Object.getOwnPropertyDescriptors(RoomObjectExtend.prototype),
);
