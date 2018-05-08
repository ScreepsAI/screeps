import { Install } from './utils';
import { Component } from './lib';

export class Root extends Component {
	static namespace = 'Root';

	constructor() {
		super('Root');
	}

	state = {
		cpuBeforeInstall: 0,
	};

	componentWillRun() {
		console.log(String.fromCodePoint(0x231b), 'Code Reloading ...');
		this.setState({ cpuBeforeInstall: Game.cpu.getUsed() });
	}

	componentDidRun() {
		global.isRoot = true;
		Log.success('Root Done', Dye.grey(`cpu-cost:${(Game.cpu.getUsed() - this.state.cpuBeforeInstall).toFixed(2)}`));
	}

	run() {
		this.constants();
		this.utils();
		this.prototypes();
		this.modules();
		this.managers();
	}

	private constants() {
		Install(global, require('./Constants').Constants);
		Install(global, require('config'));
	}

	private utils() {
		Install('Util', require('./utils').Util, {
			emoji: require('./utils/Emoji').Emoji,
		});
	}

	private prototypes() {
		require('./prototypes/Flag').install();
		require('./prototypes/Room').install();
		require('./prototypes/Creep').install();
	}

	private modules() {
		Install(global, {
			State: {},
			Dye: new (require('./modules/Dye')).Dye(),
			Log: new (require('./modules/Log')).Log(),
		});
	}

	private managers() {
		Install(global, {
			RoomManager: new (require('./managers/RoomManager')).RoomManager(),
			CreepManager: new (require('./managers/CreepManager')).CreepManager(),
			FlagManager: new (require('./managers/FlagManager')).FlagManager(),
		});
	}
}
