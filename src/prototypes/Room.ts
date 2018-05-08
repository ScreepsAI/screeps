import { RoomStructure } from './RoomStructure';
import { RoomCreep } from './RoomCreep';

class RoomExtend extends Room {
	// ////////////////////////////////////////////////////////////////////
	// cache
	// ////////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) this[`_${key}`] = func() || [];
		return this[`_${key}`];
	}

	private memoryCache(key: string, func: Function): any {
		if (_.isUndefined(this.memory[key])) {
			let objs = func();
			this[`_${key}`] = objs;
			this.memory[key] = Util.objectsToIds(objs) || [];
			return objs;
		}
		if (_.isUndefined(this[`_${key}`])) {
			let objs = Util.getObjectsByIds(this.memory[key]);
			this[`_${key}`] = objs;
			return objs;
		}
		return this[`_${key}`];
	}

	private readonlyCache(key: string): any {
		let ids = this.memory[key];
		if (_.isUndefined(ids)) return [];
		if (_.isUndefined(this[`_${key}`])) {
			if (!_.isArray(ids)) ids = Object.keys(ids);
			this[`_${key}`] = Util.getObjectsByIds(ids);
		}
		return this[`_${key}`];
	}

	// ////////////////////////////////////////////////////////////////////
	// extend
	// ////////////////////////////////////////////////////////////////////

	get print(): string {
		return this.cache('print', () => Util.link(this.name));
	}

	get my(): boolean {
		return this.cache('my', () => this.controller && this.controller.my);
	}

	get structures(): RoomStructure {
		return this.cache('structures', () => new RoomStructure(this));
	}

	get creeps(): RoomCreep {
		return this.cache('creeps', () => new RoomCreep(this));
	}

	get constructionSites(): ConstructionSite[] {
		return this.cache('constructionSites', () => this.find(FIND_MY_CONSTRUCTION_SITES));
	}

	get sources(): Source[] {
		return this.memoryCache('sources', () => this.find(FIND_SOURCES));
	}

	get minerals(): Mineral[] {
		return this.memoryCache('minerals', () => this.find(FIND_MINERALS));
	}

	get spawns(): StructureSpawn[] {
		return this.readonlyCache('spawns');
	}
}

export const install = () => Util.define(Room, RoomExtend);
