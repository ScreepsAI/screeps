export class GameEvent {
	constructor(trigger: () => boolean) {
		if (_.isUndefined(Memory.events)) Memory.events = {};
		this.trigger = trigger;
	}

	state: Function[] = [];

	trigger(): boolean {
		return false;
	}

	handle(e?: any): void {
		if (this.trigger()) _.forEach(this.state, func => func(e));
	}

	on(func: Function): void {
		this.state.push(func);
	}

	fresh(): void {
		this.state = [];
	}
}