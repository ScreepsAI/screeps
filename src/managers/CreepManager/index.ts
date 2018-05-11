import { Manager } from '../';
import { GameEvent } from '../../lib';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
		Util.setDefault(Memory, 'creeps', {});
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

	behaviours = {
		worker: new (require('./behaviours/worker')).WorkerBehaviour(this),
	};

	actions = {
		harvesting: new (require('./actions/harvesting')).ActionHarvesting(this),
		upgrading: new (require('./actions/upgrading')).ActionUpgrading(this),
	};

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

		_.forEach(Game.creeps, creep => {
			this.behaviours[creep.memory.behaviour].runPer(creep);
		});
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

	assignAction(creep: Creep, action: CreepAction, target?: Target): boolean {
		if (!creep || !action) return false;
		const actionName = action.namespace;

		if (target) {
			const targetId = target.id;
			const oldTargetId = creep.memory.targetId;
			Util.setDefault(target, 'targetOf', {});
			target.targetOf[creep.name] = creep.memory;

			if (oldTargetId && targetId !== oldTargetId) {
				delete creep.memory.path;
				const oldTarget = Game.getObjectById(oldTargetId) as Target;
				if (oldTarget && oldTarget.targetOf) delete oldTarget.targetOf[creep.name];
			}
			creep.memory.lastTargetId = creep.memory.targetId;
			creep.memory.targetId = targetId;
			creep.target = target;
		} else {
			creep.memory.lastTargetId = creep.memory.targetId;
			delete creep.target;
		}

		creep.memory.lastActionName = creep.memory.actionName;
		creep.memory.actionName = actionName;

		creep.action = action;
		// @ts-ignore
		action.onAssignment(creep, target);

		// say action
		if (target) creep.room.visual.line(creep.pos, target.pos, { width: 0.2, opacity: 0.2 });
		creep.say(Util.emoji[actionName]);
		return true;
	}

	assignFlag(creep: Creep, flag: Flag): boolean {
		if (!creep || !flag) return false;
		const memory = creep.memory;
		const flagName = flag.name;
		const oldFlagName = memory.flagName;

		if (_.isUndefined(flag.targetOf)) flag.targetOf = {};
		flag.targetOf[creep.name] = memory;

		if (oldFlagName && flagName !== oldFlagName) {
			const oldFlag = Game.flags[oldFlagName];
			if (oldFlag && oldFlag.targetOf) delete oldFlag.targetOf[creep.name];
		}

		memory.lastFlagName = memory.flagName;
		memory.flagName = flagName;
		creep.flag = flag;
		return true;
	}
}
