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
	}

	analyze(): void {
		const rooms = _.uniq(_.map(Memory.creeps, 'roomName'));
		_.forEach(rooms, (roomName: string) => {
			const room = Game.rooms[roomName];
			const creeps = _.filter(Memory.creeps, c => c.roomName === roomName);
			this.countCreep(room, _.values(creeps));
		});
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
		memory.carry = creep.carry;
		memory.ttl = creep.ticksToLive || 0;
		memory.roomName = creep.pos.roomName;
		if (memory.renewTicks && memory.ttl <= memory.renewTicks) memory.renewCheck = true;
	}

	private countCreep(room: Room, creeps: CreepMemory[]): void {
		const behaviours: string[] = _.uniq(_.map(creeps, 'behaviour'));
		const actionNames: string[] = _.uniq(_.map(creeps, 'actionNames'));

		if (!room.population)
			room.population = {
				behaviourCount: {},
				actionCount: {},
			};

		_.forEach(behaviours, type => {
			const count = _.filter(creeps, c => c.behaviour === type).length;
			room.population.behaviourCount[type] = count;
		});

		_.forEach(actionNames, type => {
			const count = _.filter(creeps, c => c.actionName === type).length;
			room.population.actionCount[type] = count;
		});
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
