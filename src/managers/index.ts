export abstract class Manager {
	namespace: string;

	protected constructor(name: string) {
		this.namespace = name;
	}

	state = {};

	protected setState(value: Object): void {
		_.assign(this.state, value);
	}

	fresh(): void {}

	register(): void {}

	analyze(): void {}

	run(): void {}

	cleanup(): void {}
}
