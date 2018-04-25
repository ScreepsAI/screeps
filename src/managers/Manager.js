import _ from 'lodash';
import { TickCacheManager } from '../global/TickCacheManager';

/**
 * manager 是一个对一类对象进行管理的工具
 */
export class Manager {
	/**
	 * entries为运行时环境缓存
	 * 一旦重新提交代码或者过了24点，将会被清空
	 */
	constructor(name) {
		this.name = _.upperFirst(name);
		this.init();
	}

	get memory() {
		return Memory.Managers[this.name];
	}

	set memory(value) {
		Memory.Managers[this.name] = value;
	}

	init() {
		this.managerName = this.name + 'Manager';
		this.cacheName = this.name + 'Caches';
		this.entries = {};
		/**
		 * 单帧缓存字典
		 */
		this.tick = new TickCacheManager();

		// 初始化 memory 容器
		if (_.isUndefined(this.memory)) {
			this.memory = {};
			this.memory.entries = {};
		}
	}

	/**
	 * 是指清理Manager的entries列表中存在但是游戏中不存在的对象
	 */
	clean() {}

	/**
	 * 是指从Memory恢复数据到global中
	 */
	rebootFromMemory() {}

	/**
	 * TODOs 优化接口
	 */
	// 获取实例化对象
	get(id) {
		const tickEntry = this.tick.get(id);
		if (tickEntry) return tickEntry;

		const runtimeEntry = this.entries[id];
		if (runtimeEntry) return this.tick.push(runtimeEntry);

		let entry;
		const memoryEntry = this.memory.entries[id];
		if (memoryEntry) entry = this.instantiate(memoryEntry);
		if (entry) {
			this.entries[id] = entry;
			return this.tick.push(entry);
		}

		return undefined;
	}

	/**
	 * 使用Memory中查询到的data实例化对象
	 * @param memoryData
	 */
	instantiate(memoryData) {}

	/**
	 * TODOs 优化接口
	 */
	add(obj) {
		if (this.memory.entries[obj.id] === undefined) {
			this.memory.entries[obj.id] = true;
		}
		this.entries[obj.id] = obj;
	}

	addEntries(objs) {
		if (_.isArray(objs)) {
			_.each(objs, obj => this.add(obj));
		}
	}

	// protected set memory(value: any) {
	// 	Memory.manager[this.name] = value;
	// }

	// protected getValue(manager: string, path: string) {
	// 	return _.get(Memory.manager, [manager, path]);
	// }

	// protected setValue(manager: string, path: string, value: any): void {
	// 	_.set(Memory.manager, [manager, path], value);
	// }

	/**
	 * 将存储对象全部置空
	 */
	setEmpty() {
		this.memory.entries = {};
		this.entries = {};
		this.rebootFromMemory();
	}
}
