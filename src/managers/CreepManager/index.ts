import { Manager } from '../';
import { GameEvent } from '../../lib';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
		if (_.isUndefined(Memory.creeps)) Memory.creeps = {};
	}

	population = new (require('./Population')).CreepPopulation(this);

	events = {
		spawningStarted: new GameEvent(),
		spawningCompleted: new GameEvent(),
		died: new GameEvent(),
	};

	setups = {
		worker: new (require('./setups/worker')).WorkerSetup(this),
	};

	behaviours = {};

	actions = {};

	// ////////////////////////////////////////////////////////////////////
	// Manager
	// ////////////////////////////////////////////////////////////////////

	fresh(): void {
		_.forEach(this.events, event => event.fresh());
		this.population.fresh();
	}

	register(): void {
		this.population.register();
		this.creepMoudle('setups', 'register');
		this.creepMoudle('behaviours', 'register');
		this.creepMoudle('actions', 'register');
	}

	analyze(): void {
		this.population.analyze();
		_.forEach(Memory.creeps, (memory, name: string) => {
			this.population.analyzePer(memory, name);
		});

		this.creepMoudle('setups', 'analyze');
		this.creepMoudle('behaviours', 'analyze');
		this.creepMoudle('actions', 'analyze');

		_.forEach(Game.rooms, room => {
			this.creepMoudlePer(room, 'setups', 'analyze');
		});
	}

	run(): void {
		this.population.run();
		this.creepMoudle('setups', 'run');
		this.creepMoudle('behaviours', 'run');
		this.creepMoudle('actions', 'run');

		_.forEach(Game.creeps, creep => {});
	}

	cleanup(): void {
		this.population.cleanup();
		this.creepMoudle('setups', 'cleanup');
		this.creepMoudle('behaviours', 'cleanup');
		this.creepMoudle('actions', 'cleanup');
	}

	// ////////////////////////////////////////////////////////////////////
	// Util
	// ////////////////////////////////////////////////////////////////////

	private creepMoudle(module: string, prototype: string): void {
		_.forEach(this[module], m => {
			if (m.check()) m[prototype]();
		});
	}

	private creepMoudlePer(arg: Room | Creep, module: string, prototype: string): void {
		_.forEach(this[module], m => {
			if (m.checkPer(arg)) m[prototype + 'Per'](arg);
		});
	}

	registerAction(creep: Creep, action: CreepAction, target: Target): void {
		const memory = creep.memory;
		const actionName = action.namespace;
		const targetId = target.id || target.name;
		const oldTargetId = memory.targetId;

		if (_.isUndefined(target.targetOf)) target.targetOf = {};
		target.targetOf[creep.name] = memory;

		if (oldTargetId && targetId !== oldTargetId) {
			delete memory.path;
			const oldTarget = Game.getObjectById(oldTargetId) as Target;
			if (oldTarget && oldTarget.targetOf) delete oldTarget.targetOf[creep.name];
		}
		memory.actionName = actionName;
		memory.targetId = targetId;
		creep.action = action;
		creep.target = target;
	}

	registerFlag(creep: Creep, flag: Flag): void {
		const memory = creep.memory;
		const flagName = flag.name;
		const oldFlagName = memory.flagName;

		if (_.isUndefined(flag.targetOf)) flag.targetOf = {};
		flag.targetOf[creep.name] = memory;

		if (oldFlagName && flagName !== oldFlagName) {
			const oldFlag = Game.flags[oldFlagName];
			if (oldFlag && oldFlag.targetOf) delete oldFlag.targetOf[creep.name];
		}

		memory.flagName = flagName;
		creep.flag = flag;
	}
}
