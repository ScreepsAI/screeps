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

export abstract class Module extends Manager {
	check(): boolean {
		return true;
	}

	// @ts-ignore
	checkPer(...arg: any[]): boolean {
		return true;
	}

	// @ts-ignore
	freshPer(...arg: any[]): void {}

	// @ts-ignore
	registerPer(...arg: any[]): void {}

	// @ts-ignore
	analyzePer(...arg: any[]): void {}

	// @ts-ignore
	runPer(...arg: any[]): void {}

	// @ts-ignore
	cleanupPer(...arg: any[]): void {}
}
