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
		if (runtimeEntry) return this.tickCaches.add(runtimeEntry); //找到后进行单帧缓存

		// 基本不会去找持久化缓存
		let entry;
		const memoryEntry = this.memoryCaches.get(UUID);
		if (memoryEntry) entry = instantiate(memoryEntry, this.entryClass);
		if (entry) {
			this.runtimeCaches.add(entry);
			return this.tickCaches.add(entry);
		}
		return undefined;
	}

	get entries() {
		const that = this;
		return _.forEach(this.runtimeCaches.getEntries(), (entry, UUID) => that.get(UUID));
	}

	/**
	 * 添加对象
	 * 生成UUID
	 * 同时存储到runtime和memory中
	 * @param entry
	 * @param ignoreExist 是否要忽略校验是否已存在
	 */
	add(entry, ignoreExist) {
		if (this.checkExist(entry) === false || ignoreExist) {
			entry.UUID = UUID();
			this.runtimeCaches.add(entry, ignoreExist);
		}
	}

	/**
	 * @param entries
	 * @param ignoreExist 是否要忽略校验是否已存在
	 */
	addEntries(entries, ignoreExist) {
		if (_.isArray(entries)) {
			_.each(entries, entry => this.add(entry, ignoreExist));
		} else Log.warn('params is not an array');
	}

	/**
	 * @param entry
	 * @param modifyOptions 修改字典
	 */
	modify(entry, modifyOptions) {
		if (this.checkExist(entry) === true) {
			let validOptions = {};
			_.forEach(modifyOptions, (option, key) => {
				if (key in this.entryClass.existCheckKeyArray) {
					// 过滤出有效的修改字段
					validOptions[key] = option;
				}
			});
			this.runtimeCaches.modify(entry, validOptions);
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
