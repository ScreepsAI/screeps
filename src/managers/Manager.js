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
		if (!global['entryName2Memory']) global['entryName2Memory'] = {};
		global['entryName2Memory'][entryName] = this;
		this.entryClass = entryClass;
		this.entryClassName = entryClass.className;
		this.initCacheManagerByName(entryName);
	}

	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'entryName', 'entryClassName'];
	}

	get existCheckKeyArray() {
		return ['id'];
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
		try {
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
		} catch (e) {
			throw e;
		}
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
	add(
		entry,
		{ ignoreExist = false, ignoreInstantiate = false } = {
			ignoreExist: false,
			ignoreInstantiate: false,
		},
	) {
		const exist = this.checkExist(entry);
		if (exist === false || ignoreExist) {
			if (exist) {
				entry.UUID = exist.UUID;
			} else entry.UUID = UUID();
			this.memoryCaches.add(entry, { ignoreExist, ignoreInstantiate });
			this.runtimeCaches.add(entry, { ignoreExist, ignoreInstantiate });
		}
	}

	/**
	 * @param entries
	 * @param ignoreExist 是否要忽略校验是否已存在
	 */
	addEntries(entries, ignoreExist) {
		const that = this;
		if (_.isArray(entries) && entries.length > 0)
			_.forEach(entries, entry => that.add(entry, ignoreExist));
	}

	/**
	 * @param entry
	 * @param modifyOptions 修改字典
	 */
	modify(entry, modifyOptions) {
		if (this.checkExist(entry) === true) {
			let validOptions = {};
			let invalidOptions = [];
			_.forEach(modifyOptions, (option, key) => {
				if (key in this.entryClass.existCheckKeyArray) {
					// 过滤出有效的修改字段
					validOptions[key] = option;
				} else invalidOptions.push(key);
			});
			Log.warn(`modify ${this.entryClassName}: invalid params: ${invalidOptions.join(',')}`);
			this.runtimeCaches.modify(entry, validOptions);
		}
	}

	checkExist(entry) {
		if (entry === undefined) throw new Error('entry is undefined');
		if (entry.UUID) return entry;
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
