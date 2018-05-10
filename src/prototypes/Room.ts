import { RoomStructure } from './RoomStructure';
import { RoomCreep } from './RoomCreep';
import { RoomResouce } from './RoomResouce';

class RoomExtend extends Room {
	// ////////////////////////////////////////////////////////////////////
	// cache
	// ////////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function, saveMemory?: boolean): any {
		if (_.isUndefined(this[`_${key}`])) this[`_${key}`] = func();
		if (saveMemory) this.memory[key] = this[`_${key}`];
		return this[`_${key}`];
	}

	private memoryCache(key: string, func: Function): any {
		const value = _.get(this.memory, key);
		if (State.firstLoop || RoomManager.needFreshMemory || _.isUndefined(value)) return func();
		return Util.getObjectsByIds(_.isArray(value) ? value : _.keys(value));
	}

	// ////////////////////////////////////////////////////////////////////
	// extend
	// ////////////////////////////////////////////////////////////////////

	get print(): string {
		return this.cache('print', () => Util.link(this.name));
	}

	get RCL(): number {
		return this.cache('RCL', () => (this.controller ? this.controller.level : 0), true);
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

	get resources(): RoomResouce {
		return this.cache('resources', () => new RoomResouce(this));
	}

	get constructionSites(): ConstructionSite[] {
		return this.cache('constructionSites', () => this.find(FIND_MY_CONSTRUCTION_SITES));
	}

	get sources(): Source[] {
		return this.memoryCache('sources', () => this.resources.sources);
	}

	get minerals(): Mineral[] {
		return this.memoryCache('minerals', () => this.resources.minerals);
	}

	get spawns(): StructureSpawn[] {
		return this.memoryCache('spawns', () => this.structures.spawns);
	}

	get freeSpawns(): StructureSpawn[] {
		return this.cache('freeSpawns', () => _.filter(this.spawns, s => !s.spawning));
	}

	get hasMinerOrHauler(): boolean {
		return this.cache('hasMinerOrHauler', () => {
			return this.getBehaviourCount('miner') > 0 || this.getBehaviourCount('hauler') > 0;
		});
	}

	getBehaviourCount(behaviour: string): number {
		return _.get(this.population, ['behaviourCount', behaviour], 0);
	}

	getActionCount(action: string): number {
		return _.get(this.population, ['actionCount', action], 0);
	}

	get spawnQueue(): { [behaviour: string]: SpawnOrder } {
		return _.get(this.memory, 'spawnQueue');
	}

	addSpawnQueue(order: SpawnOrder): void {
		if (_.isUndefined(this.memory.spawnQueue)) this.memory.spawnQueue = {};
		this.memory.spawnQueue[order.behaviour] = order;
	}

	get center(): Pos {
		return this.memoryCache('center', () => {
			if (this.storage) return this.storage.pos;
			if (this.spawns.length === 1) {
				const pos = this.spawns[0].pos;
				return {
					x: pos.x,
					y: pos.y + 2,
				};
			}
		});
	}

	setCenter(center?: number | Pos, centerY?: number): void {
		let x: number = 0;
		let y: number = 0;
		if (!center && !_.isUndefined(this.center)) {
			x = this.center.x;
			y = this.center.y;
		} else {
			if (center instanceof RoomPosition) {
				x = center.x;
				y = center.y;
			} else if (_.isNumber(center) && _.isNumber(centerY)) {
				x = center;
				y = centerY;
			}
		}
		if (x === 0 || y === 0) return;
		_.set(this.memory, 'center', { x, y });
		Log.room(this.name, Log.raw.success(`center set at (${x},${y})`));
	}
}

export const install = () => Util.define(Room, RoomExtend);
