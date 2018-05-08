export abstract class Component {
	static namespace: string;
	namespace: string;

	protected constructor(namespace: string) {
		this.namespace = namespace;
	}

	state = {};

	protected setState(value: Object): void {
		_.assign(this.state, value);
	}

	componentWillRun(): void {}

	componentDidRun(): void {}

	abstract run(): any;

	protected loop() {
		try {
			this.componentWillRun();
			const run = this.run();
			if (run) console.log(run);
			this.componentDidRun();
		} catch (e) {
			console.log(`<span style='color:red; font-weight: 600'>${`[${this.namespace}] Error:`}</span>`);
			ErrorMapper.handleError(e);
		}
	}
}
