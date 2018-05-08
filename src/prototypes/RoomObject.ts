class RoomObjectExtend extends RoomObject {
	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////
	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) this[`_${key}`] = func();
		return this[`_${key}`];
	}

	/// ///////////////////////////////////////////////////////////////////
	// extend
	/// ///////////////////////////////////////////////////////////////////
	get accessibleFields(): RoomPosition[] {
		return this.cache('accessibleFields', () => _.filter(this.pos.adjacent, pos => pos.accessible));
	}
}

export const install = () => Util.define(RoomObject, RoomObjectExtend);
