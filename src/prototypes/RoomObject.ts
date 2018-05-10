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
	accessible(radius: number): RoomPosition[] {
		return this.cache(`accessible${radius}`, () => _.filter(this.pos.radius(radius), pos => pos.accessible));
	}
}

export const install = () => Util.define(RoomObject, RoomObjectExtend);
