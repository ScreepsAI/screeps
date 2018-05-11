// @ts-ignore
class CreepExtend extends Creep {
	// ////////////////////////////////////////////////////////////////////
	// cache
	// ////////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) this[`_${key}`] = func() || [];
		return this[`_${key}`];
	}

	// ////////////////////////////////////////////////////////////////////
	// extend
	// ////////////////////////////////////////////////////////////////////

	get print(): string {
		return this.cache('print', () => Util.link(this.pos.roomName, this.name));
	}

	get hostile(): boolean {
		return this.cache('hostile', () => !this.my && !_.include(WHITELIST, this.owner.username));
	}

	get sum(): number {
		return this.cache('sum', () => _.sum(this.carry));
	}

	get lastTarget(): Target {
		return this.cache('lastTarget', () => {
			const { lastTarget } = this.memory;
			return lastTarget ? Game.getObjectById(lastTarget) : undefined;
		});
	}

	get lastFlag(): Flag {
		return this.cache('lastFlag', () => {
			const { lastFlagName } = this.memory;
			return lastFlagName ? Game.flags[lastFlagName] : undefined;
		});
	}

	assignTarget(target: Target): void {
		if (this.target && this.target.targetOf) {
			delete this.target.targetOf[this.name];
		}
		Util.setDefault(target, 'targetOf', {});
		target.targetOf[this.name] = this.memory;
		this.memory.targetId = target.id;
		this.target = target;
	}

	assignAction(action: CreepAction | string, target?: Target): boolean {
		if (_.isString(action)) action = CreepManager.actions[action];
		// @ts-ignore
		return CreepManager.assignAction(this, action, target);
	}

	unAssignAction(): void {
		if (this.target && this.target.targetOf) {
			delete this.target.targetOf[this.name];
		}
		delete this.memory.actionName;
		delete this.memory.targetId;
		delete this.action;
		delete this.target;
	}

	assignFlag(flag: Flag | string): boolean {
		if (_.isString(flag)) flag = Game.flags[flag];
		// @ts-ignore
		return CreepManager.assignFlag(this, flag);
	}

	getBodypartsCount(partType: BodyPartConstant): number {
		return _(this.body)
			.filter({ partType })
			.value().length;
	}
}

export const install = () => Util.define(Creep, CreepExtend);
