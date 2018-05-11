import { RoomModule } from '../Module';

export class RoomSpawn extends RoomModule {
	constructor(manager: RoomManager) {
		super('RoomSpawn', manager);
	}

	spawnPriority = ['worker'];

	// ////////////////////////////////////////////////////////////////////
	// Module
	// ////////////////////////////////////////////////////////////////////

	checkPer(room: Room): boolean {
		return room.my;
	}

	register(): void {
		this.manager.events.structuresChanged.on(this.saveSpawn);
	}

	registerPer(room: Room): void {
		Util.setDefault(room.memory, 'spawnQueue', {});
	}

	analyzePer(room: Room): void {
		if (State.firstLoop || this.manager.needFreshMemory) this.saveSpawn(room);
	}

	runPer(room: Room): void {
		if (room.freeSpawns.length === 0 || !this.checkEnergy(room)) return;
		_.forEach(room.freeSpawns, spawn => {
			let free = !spawn.spawning;
			_.forEach(this.spawnPriority, behaviour => {
				if (!free) return;
				const spawnOrder = room.spawnQueue[behaviour];
				if (spawnOrder && spawnOrder.count > 0 && this.dealSpawnOrder(spawn, spawnOrder)) {
					free = false;
					spawnOrder.count--;
					if (spawnOrder.count === 0) delete room.memory.spawnQueue[behaviour];
				}
			});
		});
	}

	// ////////////////////////////////////////////////////////////////////
	// Other
	// ////////////////////////////////////////////////////////////////////
	private checkEnergy(room: Room): boolean {
		let check = true;
		_.forEach(this.spawnPriority, behaviour => {
			if (!check) return;
			const spawnOrder = room.spawnQueue[behaviour];
			if (_.isUndefined(spawnOrder)) return;
			if (room.energyAvailable < spawnOrder.cost) check = false;
		});
		return check;
	}

	private saveSpawn(room: Room): void {
		_.set(room.memory, 'spawns', {});
		_.forEach(room.structures.spawns, s => {
			room.memory.spawns[s.id] = {
				direction: s.direction,
			};
		});
	}

	// TODO: driection && extentions
	private dealSpawnOrder(spawn: StructureSpawn, order: SpawnOrder): boolean {
		const opts: any = {};
		opts.memory = {
			name: order.name,
			roomName: spawn.pos.roomName,
			homeRoom: spawn.pos.roomName,
			behaviour: order.behaviour,
			body: order.body,
			spawned: false,
		};
		if (spawn.direction !== 0) opts.direction = spawn.direction;
		if (spawn.energyStructures) opts.energyStructures = spawn.energyStructures;
		// @ts-ignore
		const cb = spawn.spawnCreep(order.body, order.name, opts);
		if (cb !== OK) return false;
		CreepManager.events.spawningStarted.handle(order.name);
		return true;
	}
}
