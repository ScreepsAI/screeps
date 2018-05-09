import { Manager } from '../';
import { GameEvent } from '../../lib';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
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
		this.population.fresh();
	}

	register(): void {
		this.population.register();
	}

	analyze(): void {
		this.population.analyze();
		_.forEach(Game.rooms, room => {
			_.forEach(this.setups, setup => (setup.checkPerRoom(room) ? setup.analyzePerRoom(room) : null));
		});
	}

	run(): void {
		this.population.run();
		_.forEach(Game.creeps, creep => {});
	}

	cleanup(): void {
		this.population.cleanup();
	}

	// ////////////////////////////////////////////////////////////////////
	// Util
	// ////////////////////////////////////////////////////////////////////

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
