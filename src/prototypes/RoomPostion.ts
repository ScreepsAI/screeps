class RoomPositionExtend extends RoomPosition {
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
	get adjacent(): RoomPosition[] {
		return this.cache('adjacent', () => this.radius(1));
	}

	get terrain(): Terrain {
		return this.cache('terrain', () => Game.map.getTerrainAt(this));
	}

	get structures(): Structure[] {
		return this.cache('structures', () => this.lookFor(LOOK_STRUCTURES));
	}

	get constructionSites(): ConstructionSite[] {
		return this.cache('constructionSites', () => this.lookFor(LOOK_CONSTRUCTION_SITES));
	}

	get creeps(): Creep[] {
		return this.cache('creeps', () => this.lookFor(LOOK_CREEPS));
	}

	get accessible(): boolean {
		return this.cache('accessible', () => {
			if (this.terrain === 'wall') return false;
			const type: string[] = [STRUCTURE_CONTAINER, STRUCTURE_ROAD];
			const room = Game.rooms[this.roomName];
			if (room && room.my) type.push(STRUCTURE_RAMPART);
			const filter = (s: Structure | ConstructionSite) => !_.include(type, s.structureType);
			if (this.structures.length > 0 && _.filter(this.structures, filter).length > 0) return false;
			if (this.constructionSites.length > 0 && _.filter(this.constructionSites, filter).length > 0) return false;
			return true;
		});
	}

	radius(radius: number): RoomPosition[] {
		const positions = [];
		for (let x = this.x - radius; x <= this.x + radius; x++) {
			for (let y = this.y - radius; y <= this.y + radius; y++) {
				if (x < 49 && x > 0 && y > 0 && y < 49) {
					if (x !== this.x || y !== this.y) positions.push(new RoomPosition(x, y, this.roomName));
				}
			}
		}
		return positions;
	}

	direction(direction: number): RoomPosition {
		switch (direction) {
			case TOP:
				return new RoomPosition(this.x, this.y - 1, this.roomName);
			case TOP_RIGHT:
				return new RoomPosition(this.x + 1, this.y - 1, this.roomName);
			case RIGHT:
				return new RoomPosition(this.x + 1, this.y, this.roomName);
			case BOTTOM_RIGHT:
				return new RoomPosition(this.x + 1, this.y + 1, this.roomName);
			case BOTTOM:
				return new RoomPosition(this.x, this.y + 1, this.roomName);
			case BOTTOM_LEFT:
				return new RoomPosition(this.x - 1, this.y + 1, this.roomName);
			case LEFT:
				return new RoomPosition(this.x - 1, this.y, this.roomName);
			case TOP_LEFT:
				return new RoomPosition(this.x - 1, this.y - 1, this.roomName);
			default:
				return new RoomPosition(this.x, this.y, this.roomName);
		}
	}
}

export const install = () => Util.define(RoomPosition, RoomPositionExtend);
