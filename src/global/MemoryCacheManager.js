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
			if (UUID === undefined) throw new Error('UUID is undefined');
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
		const entries = Memory[`${this.entryName}s`];
		if (!entries) throw new Error(`unable to find this kind of Entry: ${this.entryName} in Memory`);
		return entries;
	}

	add(entry) {
		if (entry === undefined) throw new Error('entry is undefined');
		if (entry.UUID === undefined) throw new Error('entry has not a UUID');
		if (entry.raw === undefined) throw new Error('entry has not raw param');
		if (this.checkExist(entry)) throw new Error('exist entry');
		else return (Memory[`${this.entryName}s`][entry.UUID] = entry.raw);
	}

	delete(UUID) {
		if (UUID === undefined) throw new Error('UUID is undefined');
		delete Memory[`${this.entryName}s`][UUID];
	}

	/**
	 * 初始化checkExistFunc
	 */
	initCheckExist() {
		if (_.isArray(this.existCheckKeyArray)) {
			this.checkExistFunc = (checkEntry, entry, checkKeys, existObject) => {
				_.forEach(checkKeys, checkKey => {
					if (!checkEntry[checkKey] || checkEntry[checkKey] !== entry[checkKey])
						existObject.exist = false;
				});
			};
		} else if (_.isString(this.existCheckKeyArray)) {
			this.checkExistFunc = (checkEntry, entry, checkKey, existObject) => {
				if (!checkEntry[checkKey] || checkEntry[checkKey] !== entry[checkKey])
					existObject.exist = false;
			};
		}
	}

	checkExist(checkEntry) {
		let existObject = { exist: true };
		_.forEach(Memory[`${this.entryName}s`], entry => {
			this.checkExistFunc(checkEntry, entry, this.existCheckKeyArray, existObject);
		});
		return existObject.exist;
	}

	setEmpty() {
		return (Memory[`${this.entryName}s`] = {});
	}
}
