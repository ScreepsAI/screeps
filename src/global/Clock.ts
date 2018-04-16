/**
 * 时钟对象 能够暂停，重启，清空，销毁
 * 脚本初始化的时候会将autoRun为true的自动初始化
 */
class Clock {
	public name: string;
	public initParams: object;
	public tick: number;
	public func: Function;
	public autoRun: boolean;

	constructor(name: string, initParams: object, func: Function, tick: number, autoRun: boolean = false) {
		this.name = name;
		this.initParams = initParams;
		this.func = func;
		this.tick = tick;
		this.autoRun = autoRun;
		this.init();
	}

	// 时钟用到的参数表，最好只存储单层字面量成员的对象
	get params() {
		if (Memory.Clocks[this.name]) return Memory.Clocks[this.name].params;
	}

	set params(v) {
		if (Memory.Clocks[this.name]) Memory.Clocks[this.name].params = v;
	}

	// 暂停标签
	get isPause() {
		if (Memory.Clocks[this.name]) return Memory.Clocks[this.name].isPause;
	}

	set isPause(v) {
		if (Memory.Clocks[this.name]) Memory.Clocks[this.name].isPause = v;
	}

	// 周期
	get T() {
		if (Memory.Clocks[this.name]) return Memory.Clocks[this.name].T;
	}

	set T(v) {
		if (Memory.Clocks[this.name]) Memory.Clocks[this.name].T = v;
	}

	// 初始化
	init() {
		if (!Memory.Clocks) Memory.Clocks = {};

		if (!Memory.Clocks[this.name]) {
			Memory.Clocks[this.name] = {
				// 写到Memory
				isPause: false,
				T: this.tick,
				params: {},
			};
			this.params = this.initParams;
		} else if (hasRoot) return; // 定义过则跳过

		// autoRun时自动加入Clocks大时钟，否则要手动加入
		if (this.autoRun) Clocks.addClock(this);
		Log.info('Clock ' + this.name + 'has been initialized');
	}

	run() {
		if (!this.isPause && Game.time % this.T === 0) {
			this.func(this.params);
		}
	}

	start() {
		this.isPause = false;
	}

	// 暂停
	pause() {
		this.isPause = true;
	}

	// 销毁时钟，从内存和运行环境中移除
	destory() {
		delete Clocks[this.name];
		delete Memory.Clocks[this.name];
	}

	// 回复时钟参数表到初始状态
	restart() {
		this.params = this.initParams;
	}
}

export { Clock };
