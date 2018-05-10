class StructureSpawnExtend extends StructureSpawn {
	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////
	private memoryCache(key: string, func: Function): any {
		const value = _.get(this.room.memory, ['spawns', this.id, key]);
		if (State.firstLoop || RoomManager.needFreshMemory || _.isUndefined(value)) return func();
		return value;
	}

	/// ///////////////////////////////////////////////////////////////////
	// extend
	/// ///////////////////////////////////////////////////////////////////

	get direction(): number | null {
		return this.memoryCache('direction', () => {
			const center = this.room.center;
			if (_.isUndefined(center)) return null;
			return Util.getDiretion(center, this.pos);
		});
	}
}

export const install = () => Util.define(StructureSpawn, StructureSpawnExtend);
