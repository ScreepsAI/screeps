import _ from 'lodash';
import { Loop } from './loop';

exports.loop = function() {
	let thread;
	try {
		Loop();
	} catch (e) {
		console.log(`Code Changing at ${Game.time} ...`);
	}
};
