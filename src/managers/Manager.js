import _ from 'lodash';
import { instantiate, UUID } from '../utils/global';
import { MemoryCacheManager } from '../global/MemoryCacheManager';
import { RuntimeCacheManager } from '../global/RuntimeCacheManager';
import { TickCacheManager } from '../global/TickCacheManager';

/**
 * manager 是一个对一类对象进行管理的工具
 */
export class Manager {
	/**
	 * entries为运行时环境缓存
	 * 一旦重新提交代码或者过了24点，将会被清空
	 */
	constructor(entryName, entryClass) {
		this.entryName = entryName;
		this.entryClass = entryClass;
		this.initCacheManagerByName(entryName);
	}

	initCacheManagerByName(entryName) {
		if (_.isString(entryName)) {
			this.memoryCaches = new MemoryCacheManager(entryName, this.entryClass.existCheckKeyArray);
			this.runtimeCaches = new RuntimeCacheManager(this.memoryCaches, this.entryClass);
			this.tickCaches = new TickCacheManager(this.memoryCaches);
		} else throw new Error('entry name is not a string');
	}

	// 获取实例化对象
	get(UUID) {
		// 优先获取单帧缓存
		const tickEntry = this.tickCaches.get(UUID);
		if (tickEntry) return tickEntry;

		// 再考虑运行时缓存
		const runtimeEntry = this.runtimeCaches.get(UUID);
		if (runtimeEntry) return this.tickCaches.push(runtimeEntry); //找到后进行单帧缓存

		// 基本不会去找持久化缓存
		let entry;
		const memoryEntry = this.memoryCaches.get(UUID);
		if (memoryEntry) entry = instantiate(memoryEntry, this.entryClass);
		if (entry) {
			this.runtimeCaches.push(entry);
			return this.tickCaches.push(entry);
		}
		return undefined;
	}

	getEntries() {
		return this.runtimeCaches.getEntries();
	}

	add(entry) {
		if (this.checkExist(entry)) {
			entry.UUID = UUID();
			this.memoryCaches.push(entry);
			this.runtimeCaches.push(entry);
		} else Log.error(`exist entry: ${this.entryName}`);
	}

	addEntries(objs) {
		if (_.isArray(objs)) {
			_.each(objs, obj => this.add(obj));
		}
	}
	checkExist(entry) {
		if (entry === undefined) throw new Error('entry is undefined');
		if (entry.UUID) return true;
		else return this.memoryCaches.checkExist(entry);
	}

	// 清空缓存管理器 - 谨慎调用
	setEmpty() {
		this.memoryCaches.setEmpty();
		this.runtimeCaches.setEmpty();
		this.tickCaches.setEmpty();
	}

	// 是指清理Manager的entries列表中存在但是游戏中不存在的对象
	clean() {}
}
