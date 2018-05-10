class SourceExtend extends Source {
	// ////////////////////////////////////////////////////////////////////
	// cache
	// ////////////////////////////////////////////////////////////////////

	private memoryCache(key: string, func: Function): any {
		const value = _.get(this.room.memory, ['spawns', this.id, key]);
		if (State.firstLoop || RoomManager.needFreshMemory || _.isUndefined(value)) return func();
		return value;
	}

	// ////////////////////////////////////////////////////////////////////
	// extend
	// ////////////////////////////////////////////////////////////////////

	get accessibleFields(): number {
		return this.memoryCache('accessibleFields', () => this.accessible(1).length);
	}

	get container(): StructureContainer | null {
		return this.memoryCache('container', () => {
			const container = this.pos.findInRange(this.room.structures.containers, 1)[0];
			return container ? container.id : null;
		});
	}

	get link(): StructureLink | null {
		return this.memoryCache('link', () => {
			if (!this.room.my || this.room.RCL < 5) return null;
			const link = this.pos.findInRange(this.room.structures.links, 2)[0];
			return link ? link.id : null;
		});
	}
}

export const install = () => Util.define(Source, SourceExtend);
