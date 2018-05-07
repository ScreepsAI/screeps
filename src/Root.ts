import { Install, getUsername } from './utils';
import { Component } from './lib';
import { InstallProtoype } from './prototypes';

export class Root extends Component {
	static namespace = 'Root';

	constructor() {
		super('Root');
	}

	state = {
		cpuBeforeInstall: 0,
	};

	componentWillMount() {
		console.log(String.fromCodePoint(0x231b), 'Code Reloading ...');
		this.setState({ cpuBeforeInstall: Game.cpu.getUsed() });
	}

	componentDidMount() {
		global.isRoot = true;
		Log.success('Root Done', Dye.grey(`cpu-cost:${(Game.cpu.getUsed() - this.state.cpuBeforeInstall).toFixed(2)}`));
	}

	render() {
		this.config();
		this.utils();
		this.modules();
	}

	private config() {
		Install('_ME', getUsername);
		Install(global, require('config'));
	}

	private utils() {
		Install('Util', require('./utils').Util, {
			emoji: require('./utils/Emoji').Emoji,
		});
	}

	private modules() {
		InstallProtoype();
		Install(global, {
			Dye: new (require('./modules/Dye')).Dye(),
			Log: new (require('./modules/Log')).Log(),
		});
	}
}
