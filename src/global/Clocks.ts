import * as _ from 'lodash';

/**
 * 大时钟
 */
class Clocks {
	private l = {};

	constructor() {
		if (!Memory.Clocks) Memory.Clocks = {};
	}

	get list(): string[] {
		return _.map(this.l, (clock: Clock) => `'${clock.name}'`);
	}

	getClock(name: string): Clock {
		return this.l[name] || Memory.Clocks[name];
	}

	addClock(clock: Clock) {
		this.l[clock.name] = clock;
	}

	// 跳秒
	tick = (): void => {
		_.each(this.l, (clock: Clock) => {
			clock.run();
		});
	};
}

export { Clocks };
