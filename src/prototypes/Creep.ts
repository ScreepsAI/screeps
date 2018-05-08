class CreepExtend extends Creep {
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

	get print(): string {
		return this.cache('print', () => Util.link(this.pos.roomName, this.name));
	}

	get hostile(): boolean {
		return this.cache('hostile', () => !this.my && !_.include(WHITELIST, this.owner.username));
	}
}

export const install = () => Util.define(Creep, CreepExtend);
