/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description:
 */
import _ from 'lodash';
import { instantiate } from '../utils/global';

export class RuntimeCacheManager {
	constructor(memoryCacheManager, entryClass) {
		this.memoryCacheManager = memoryCacheManager;
		this.entryClass = entryClass;
		this.entryName = this.memoryCacheManager.entryName;
		const entries = global[`${this.entryName}s`];
		if (entries === undefined) this.setEmpty();
		this.reloadFromMemory();
	}

	get(UUID) {
		try {
			if (UUID === undefined) throw new Error('UUID is undefined');
			const entries = global[`${this.entryName}s`];
			if (!entries)
				throw new Error(`unable to find this kind of Entry: ${this.entryName} in Global`);
			return entries[UUID];
		} catch (e) {
			throw e;
			return undefined;
		}
	}

	getEntries() {
		const entries = global[`${this.entryName}s`];
		if (!entries) throw new Error(`unable to find this kind of Entry: ${this.entryName} in Global`);
		return entries;
	}

	add(entry) {
		if (entry === undefined) throw new Error('entry is undefined');
		if (!(entry instanceof this.entryClass))
			throw new Error(`entry is instanceof ${this.entryClass.name}`);
		if (entry.UUID === undefined) throw new Error('entry has not a UUID');
		this.memoryCacheManager.add(entry);
		return (global[`${this.entryName}s`][entry.UUID] = entry);
	}

	modify() {}

	delete(UUID) {
		if (UUID === undefined) throw new Error('UUID is undefined');
		delete global[`${this.entryName}s`][UUID];
	}

	setEmpty() {
		return (global[`${this.entryName}s`] = {});
	}

	reloadFromMemory() {
		const that = this;
		this.setEmpty();
		const memoryEntries = this.memoryCacheManager.getEntries();
		_.forEach(memoryEntries, memory => {
			that.add(instantiate(memory, that.entryClass));
		});
	}
}
