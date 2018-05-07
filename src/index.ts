// //////////////////////////////////////////////////////////////////////// //
//   _____ _____ _____ _____ _____ _____ _____    _____    __ _____ _____   //
//  |   __|     | __  |   __|   __|  _  |   __|  |     |__|  | __  |  |  |  //
//  |__   |   --|    -|   __|   __|   __|__   |  |  |  |  |  | __ -|    -|  //
//  |_____|_____|__|__|_____|_____|__|  |_____|  |_____|_____|_____|__|__|  //
//                                                                          //
//             OJBK Repo: https://github.com/ScreepsAI/screeps              //
//                                                                          //
// //////////////////////////////////////////////////////////////////////// //

import { ErrorMapper } from './modules/ErrorMapper';
import { Splash } from './utils/Splash';
import { Process } from './Process';
import { Root } from './Root';
import { Loop } from './utils';
import { Component } from './lib';

Splash();
global.isDev = ENV !== 'production';
if (isDev) global.ErrorMapper = new ErrorMapper();

class Core extends Component {
	static namespace = 'Core';

	constructor() {
		super('Core');
	}

	componentWillMount() {
		if (_.isUndefined(global.isRoot)) Loop(Root);
	}

	componentDidMount() {
		Game.cacheTime = Game.time;
	}

	render() {
		Loop(Process);
	}
}

export const loop = () => {
	if (_.size(Game.rooms) === 0) return;
	isDev ? global.ErrorMapper.wrapLoop(<Function>Loop(Core)) : Loop(Core);
};
