export class GameEvent {
	constructor(trigger?: () => boolean) {
		Util.setDefault(Memory, 'events', {});
		if (trigger) this.trigger = trigger;
	}

	state: Function[] = [];

	trigger(): boolean {
		return true;
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
