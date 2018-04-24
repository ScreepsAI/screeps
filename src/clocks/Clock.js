/**
 * 时钟对象 能够暂停，重启，清空，销毁
 * 脚本初始化的时候会将autoRun为true的自动初始化
 */
class Clock {
	constructor({ type, name, initParams, func, tick, active = false }) {
		this.type = type;
		this.name = name;
		this.initParams = initParams;
		this.func = func;
		this.tick = tick;
		this.active = active;
		this.init();
	}

	// 时钟用到的参数表，最好只存储单层字面量成员的对象
	get params() {
		if (Memory.Managers.Clock.entries[this.name])
			return Memory.Managers.Clock.entries[this.name].params;
	}

	set params(v) {
		if (Memory.Managers.Clock.entries[this.name])
			Memory.Managers.Clock.entries[this.name].params = v;
	}

	// // 暂停标签
	// get active() {
	// 	if (Memory.Managers.Clock.entries[this.name]) return Memory.Managers.Clock.entries[this.name].active;
	// }

	// set active(v) {
	// 	if (Memory.Managers.Clock.entries[this.name]) Memory.Managers.Clock.entries[this.name].active = v;
	// }

	// // 周期
	// get tick() {
	// 	if (Memory.Managers.Clock.entries[this.name]) return Memory.Managers.Clock.entries[this.name].tick;
	// }

	// set tick(v) {
	// 	if (Memory.Managers.Clock.entries[this.name]) Memory.Managers.Clock.entries[this.name].tick = v;
	// }

	get raw() {
		const { type, tick, params, active } = this;
		return { type, tick, params, active };
	}

	// 初始化
	init() {
		// autoRun时自动加入Clocks大时钟，否则要手动加入
		Log.info('Clock ' + this.name + ' has been initialized');
	}

	run() {
		if (this.active && (this.tick === 1 || Game.time % this.tick === 0)) {
			this.func(this.params);
		}
	}

	start() {
		this.active = false;
	}

	// 暂停
	pause() {
		this.active = true;
	}

	// 销毁时钟，从内存和运行环境中移除
	destory() {
		ClockManager.removeClock(this.name);
	}

	// 回复时钟参数表到初始状态
	restart() {
		this.params = this.initParams;
	}
}

export { Clock };
