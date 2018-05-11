import { Module } from '../';

export class CreepPopulation extends Module {
	manager: CreepManager;

	constructor(manager: CreepManager) {
		super('CreepPopulation');
		this.manager = manager;
	}

	state: {
		died: string[];
		spawned: string[];
	};

	fresh(): void {
		this.state = {
			died: [],
			spawned: [],
		};
	}

	register(): void {
		this.manager.events.died.on((creepName: string) => {
			const memory = Memory.creeps[creepName];
			Log.room(memory.roomName || 'unknow', memory.ttl > 1 ? this.log.killed(creepName) : this.log.dead(creepName));
		});

		this.manager.events.spawningStarted.on((creepName: string) => {
			const memory = Memory.creeps[creepName];
			Log.room(memory.roomName || 'unknow', this.log.spawning(creepName));
		});

		this.manager.events.spawningCompleted.on((creepName: string) => {
			const memory = Memory.creeps[creepName];
			Log.room(memory.roomName || 'unknow', this.log.born(creepName));
		});
	}

	analyzePer(memory: CreepMemory, name: string): void {
		const creep = Game.creeps[name];
		if (_.isUndefined(creep)) {
			this.state.died.push(name);
			return;
		}
		if (!creep.spawning) {
			this.handleRoot(memory, creep);
			this.handleFlag(memory, creep);
		}
		this.countCreep(memory);
	}

	run(): void {
		_.forEach(this.state.spawned, (creepName: string) => {
			this.manager.events.spawningCompleted.handle(creepName);
		});
	}

	cleanup(): void {
		_.forEach(this.state.died, (creepName: string) => {
			this.manager.events.died.handle(creepName);
			delete Memory.creeps[creepName];
		});
	}

	private handleRoot(memory: CreepMemory, creep: Creep): void {
		if (!memory.spawned) {
			memory.spawned = true;
			this.state.spawned.push(creep.name);
		}
		memory.ttl = creep.ticksToLive || 0;
		memory.roomName = creep.pos.roomName;
		if (memory.renewTicks && memory.ttl <= memory.renewTicks) memory.renewCheck = true;
	}

	private countCreep(memory: CreepMemory): void {
		const { behaviour, actionName, roomName } = memory;
		const room = Game.rooms[roomName];
		if (_.isUndefined(room.population))
			room.population = {
				behaviourCount: {},
				actionCount: {},
			};
		const pop = room.population;
		if (behaviour)
			_.isUndefined(pop.actionCount[behaviour]) ? (pop.behaviourCount[behaviour] = 1) : pop.behaviourCount[behaviour]++;

		if (actionName)
			_.isUndefined(pop.actionCount[actionName]) ? (pop.actionCount[actionName] = 1) : pop.actionCount[actionName]++;
	}

	private handleFlag(memory: CreepMemory, creep: Creep): void {
		delete creep.flag;
		if (_.isUndefined(memory.flagName)) return;
		const flag = Game.flags[memory.flagName as string];
		if (_.isUndefined(flag)) {
			delete memory.flagName;
		} else {
			this.manager.assignFlag(creep, flag);
		}
	}

	private log = {
		killed: (name: string) => [Util.emoji.skull, Dye.red(name, 'has been killed...')].join(' '),
		dead: (name: string) => [Util.emoji.skull, Dye.black(name, 'was dead...')].join(' '),
		born: (name: string) => [Util.emoji.baby, Dye.green(name, 'was born!')].join(' '),
		spawning: (name: string) => [Util.emoji.baby, Dye.yellow(name, 'begin to spawn...')].join(' '),
	};
}
