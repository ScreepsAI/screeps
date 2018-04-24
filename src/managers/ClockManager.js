/**
 * Author: Ruo
 * Create: 2018-04-20
 * Description:
 */
import * as _ from 'lodash';
import { Manager } from './Manager';

export class ClockManager extends Manager {
	activeList;

	constructor() {
		super('clock');
	}

	get list() {
		return _.map(this.entries, clock => clock.name);
	}

	getClock(name) {
		return this.entries[name] || this.memory.entries[name];
	}

	addClock(clock) {
		if (!this.memory.entries[clock.name]) {
			// 定义过则不重复定义
			this.memory.entries[clock.name] = clock.raw;
			clock.params = clock.initParams;
		}
		this.entries[clock.name] = clock;
		if (clock.active) this.setAvtive(clock.name);
	}

	setAvtive(clockName) {
		if (_.isUndefined(this.activeList)) this.activeList = {};
		this.memory.entries[clockName]['active'] = true;
		this.entries[clockName]['active'] = true;
		this.activeList[clockName] = this.entries[clockName];
	}

	setInavtive(clockName) {
		this.memory.entries[clockName]['active'] = false;
		this.entries[clockName].active = false;
		delete this.activeList[clockName];
	}
	removeClock(clockName) {
		delete this.entries[clockName];
		delete this.activeList[clockName];
		delete this.memory.entries[clockName];
	}

	// // 跳秒
	tick() {
		_.each(this.activeList, clock => {
			clock.run();
		});
	}

	rebootFromMemory() {
		const that = this;
		this.entries = {};
		this.activeList = {};
		_.forEach(this.memory.entries, (clockData, clockName) => {
			const { type, params, tick, active } = clockData;
			const clock = new global[type]({ name: clockName, initParams: params, tick, active });
			that.addClock(clock);
		});
		Log.success(
			`Reboot ${_.padEnd(this.name, 20, ' ')} have ${Object.keys(this.entries).length} Clocks`,
		);
	}

	clean() {}
}
