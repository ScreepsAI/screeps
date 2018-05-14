/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description:
 */
import _ from 'lodash';

export class MemoryCacheManager {
	constructor(entryName, existCheckKeyArray) {
		this.entryName = entryName;
		this.existCheckKeyArray = existCheckKeyArray;
		const entries = Memory[`${this.entryName}s`];
		if (entries === undefined) this.setEmpty();
		this.initCheckExist();
	}

	get(UUID) {
		try {
			if (UUID === undefined)
				throw new Error(`MemoryCacheManager-${this.entryName}-get: UUID is undefined`);
			const entries = Memory[`${this.entryName}s`];
			if (!entries)
				throw new Error(`unable to find this kind of Entry: ${this.entryName} in Memory`);
			return entries[UUID];
		} catch (e) {
			throw e;
			return undefined;
		}
	}

	getEntries() {
		try {
			const entries = Memory[`${this.entryName}s`];
			if (!entries)
				throw new Error(`unable to find this kind of Entry: ${this.entryName} in Memory`);
			return entries;
		} catch (e) {
			throw e;
			return;
		}
	}

	add(
		entry,
		{ ignoreExist = false, ignoreInstantiate = false } = {
			ignoreExist: false,
			ignoreInstantiate: false,
		},
	) {
		try {
			if (entry === undefined) throw new Error('entry is undefined');
			if (entry.UUID === undefined) throw new Error('entry has not a UUID');
			if (!ignoreInstantiate && entry.raw === undefined) throw new Error('entry has not raw param');
			if (this.checkExist(entry) && !ignoreExist) throw new Error('entry has existed');
			else return (Memory[`${this.entryName}s`][entry.UUID] = entry.raw);
		} catch (e) {
			throw e;
			return;
		}
	}

	modify(entry, modifyOptions) {
		try {
			if (entry === undefined) throw new Error('entry is undefined');
			if (entry.UUID === undefined) throw new Error('entry has not a UUID');
			if (entry.raw === undefined) throw new Error('entry has not raw param');
			if (this.checkExist(entry)) {
				entry = Object.assign(entry, modifyOptions);
				return (Memory[`${this.entryName}s`][entry.UUID] = entry.raw);
			} else throw new Error('entry is not exist');
		} catch (e) {
			throw e;
			return;
		}
	}

	delete(UUID) {
		if (UUID === undefined)
			Log.error(`MemoryCacheManager-${this.entryName}-delete: UUID is undefined`);
		else delete Memory[`${this.entryName}s`][UUID];
	}

	/**
	 * 初始化checkExistFunc
	 */
	initCheckExist() {
		this.checkExistFunc = (checkEntry, entry, checkKeys, existObject) => {
			_.forEach(checkKeys, checkKey => {
				if (checkEntry[checkKey] && checkEntry[checkKey] == entry[checkKey])
					existObject.exist = entry;
			});
		};
	}

	/**
	 * 判断对象是否存在，如果存在则返回已存在的对象
	 * @param checkEntry
	 * @return {boolean}
	 */
	checkExist(checkEntry) {
		let existObject = { exist: false };
		_.forEach(Memory[`${this.entryName}s`], entry => {
			this.checkExistFunc(checkEntry, entry, this.existCheckKeyArray, existObject);
		});
		return existObject.exist;
	}

	setEmpty() {
		return (Memory[`${this.entryName}s`] = {});
	}
}
