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

	componentWillMount(): void {}

	componentDidMount(): void {}

	abstract render(): any;

	protected loop() {
		try {
			this.componentWillMount();
			const render = this.render();
			if (render) console.log(render);
			this.componentDidMount();
		} catch (e) {
			console.log(`<span style='color:red; font-weight: 600'>${`[${this.namespace}] Error:`}</span>`);
			ErrorMapper.handleError(e);
		}
	}
}
