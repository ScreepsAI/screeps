import { Module } from '../index';

export abstract class CreepAction extends Module {
	manager: CreepManager;

	protected constructor(namespace: string, manager: CreepManager) {
		super(namespace);
		this.manager = manager;
	}

	needTarget = true;

	maxPerTarget = Infinity;

	maxPerAction = Infinity;

	targetRange = 1;

	reachedRange = 1;

	abstract work(creep: Creep): number;

	abstract checkAction(creep: Creep): boolean;

	abstract checkTarget(target: Target, creep?: Creep): boolean;

	abstract getNewTarget(creep: Creep): Target | null;

	runPer(creep: Creep): boolean {
		if (!this.checkAction(creep)) {
			creep.unAssignAction();
			return false;
		}
		if (!creep.memory.actionName || creep.memory.actionName !== this.namespace) {
			console.log(creep.memory.actionName);
			creep.assignAction(this);
		}
		if (this.needTarget) {
			let target = creep.target;
			if (!target || !this.checkTarget(target, creep)) {
				target = this.getNewTarget(creep);
				if (target) creep.assignTarget(target);
				else {
					creep.unAssignAction();
					return false;
				}
			}
			const range = creep.pos.getRangeTo(target);
			// targetRange
			if (range > this.targetRange) {
				creep.moveTo(target);
				return true;
			}
			// reachedRange
			if (range > this.reachedRange) {
				const direction = creep.pos.getDirectionTo(target);
				const nextPos = Util.getDirectionPos(creep.pos, direction);
				if (nextPos.walkable) {
					creep.move(nextPos);
					return true;
				}
				if (!creep.pos.isNearTo(target)) {
					creep.moveTo(target);
					return true;
				}
			}
		}
		// run work
		const cb = this.work(creep);
		if (cb !== OK) {
			this.onError(creep);
			return false;
		}
		return true;
	}

	// @ts-ignore
	onAssignment(creep: Creep, target: Target): void {}

	// @ts-ignore
	onError(creep: Creep): void {
		creep.unAssignAction();
	}
}
