import * as _ from 'lodash';

/**
 * manager 是一个对room内的一类对象进行管理的工具
 * 包括维护相关的memory和cache
 * Memory.Managers[Name] = {
 *    entries: {[id]: [entry data]},
 *    _my: [],
 *    _ally: [],
 *    _hostile: [],
 * };
 * global.caches[cacheName] = {
 *    _my: {time:, data,}
 *    _ally: {time:, data,}
 *    _hostile: {time:, data,}
 * };
 */
export abstract class Manager {
	public name: string;
	public cacheName: string;
	/**
	 * entries为运行时环境缓存
	 * 一旦重新提交代码或者过了24点，将会被清空
	 */
	public entries: object;

	constructor(name: string) {
		this.name = _.upperFirst(name);
		this.cacheName = this.name + 'Caches';
		this.entries = {};

		// 初始化 memory 容器
		if (_.isUndefined(Memory.Managers)) Memory.Managers = {};
		if (_.isUndefined(this.memory)) {
			this.caches = {};
			this.memory = {};
			this.memory.entries = {};
		}
		this.clean();
		this.rebootFromMemory();
	}

	/**
	 * 是指清理Manager的entries列表中存在但是游戏中不存在的对象
	 */
	clean() {
		_.forEach(Object.keys(this.memory.entries), (id) => {
			const e = Game.getObjectById(id);
			if (!e) delete this.memory.entries[id];
		});
	}

	/**
	 * 是指从Memory恢复数据到global中
	 */
	rebootFromMemory(): void {
		const that = this;
		this.entries = {};
		_.forEach(Object.keys(this.memory.entries), (id) => {
			that.entries[id] = Game.getObjectById(id);
		})
		Log.success(`Reboot ${_.padEnd(that.name, 20, ' ')} have ${Object.keys(that.entries).length} entries`);
	}

	// 运行时缓存
	get caches() {
		return global.caches[this.cacheName];
	}

	set caches(v) {
		global.caches[this.cacheName] = v;
	}

	get memory(): any {
		return Memory.Managers[this.name];
	}

	set memory(value: any) {
		Memory.Managers[this.name] = value;
	}



	/**
	 * =================================================================
	 * my, ally, hostile都是单帧缓存，即只在一个tick内有效的缓存
	 * 且仅仅针对room内的对象设计，而room则独立于Manager之外
	 * =================================================================
	 */

	get my() {
		if (!this.caches._my) this.caches._my = {};
		if (!this.caches._my.data || this.caches._my.time < Game.time) {
			this.caches._my.data = _.filter(this.entries, entry => {
				if (entry instanceof Creep || entry instanceof OwnedStructure) return entry.my;
				else return false;
			});
			this.caches._my.time = Game.time;
		}
		return this.caches._my.data;
	}

	get ally() {
		if (!this.caches._ally) this.caches._ally = {};
		if (!this.caches._ally.data || this.caches._ally.time < Game.time) {
			this.caches._ally.data = _.filter(this.entries, entry => {
				if (entry instanceof Creep || entry instanceof OwnedStructure) {
					if (entry.owner) return global.WHITELIST.indexOf(entry.owner.username) >= 0;
					else return false;
				}
				return false;
			});
			this.caches._ally.time = Game.time;
		}
		return this.caches._ally.data;
	}

	get hostile() {
		if (!this.caches._hostile) this.caches._hostile = {};
		if (!this.caches._hostile.data || this.caches._hostile.time < Game.time) {
			this.caches._hostile.data = _.filter(this.entries, entry => {
				if (entry instanceof Creep || entry instanceof OwnedStructure) {
					if (entry.owner) return global.WHITELIST.indexOf(entry.owner.username) < 0;
					else return false;
				}
				return false;
			});
			this.caches._hostile.time = Game.time;
		}
		return this.caches._hostile.data;
	}

	// 获取该管理器管理的对象
	get(id: string): IdObject | undefined {
		return this.entries[id];
	}

	getMemory(id: string) {
		return this.memory.entries[id];
	}

	addEntry(obj: any) {
		if (this.memory.entries[obj.id] === undefined) {
			this.memory.entries[obj.id] = true;
		}
		this.entries[obj.id] = obj;
		return this.entries;
	}

	addEntries(objs: any[]) {
		if (_.isArray(objs)) {
			_.each(objs, obj => this.addEntry(obj));
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

	protected recordUpdateTime() {
		// TODO: 添加其他运行信息
		this.memory.time = Game.time;
	}
}
