/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description:
 */
import _ from 'lodash';
import { instantiate, checkObjectInGame } from '../utils/global';

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
			const entry = entries[UUID];
			const globalEntry = checkObjectInGame(entry);
			if (!entry && !globalEntry)
				throw new Error(`unable to find this kind of Entry: ${this.entryName} in Global`);
			return entry[UUID];
		} catch (e) {
			throw e;
			return undefined;
		}
	}

	getEntries() {
		const entries = global[`${this.entryName}s`];
		if (!entries || entries.length === 0)
			throw new Error(`unable to find this kind of Entry: ${this.entryName} in Global`);
		return entries;
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
			if (!(entry instanceof this.entryClass))
				throw new Error(`entry is instanceof ${this.entryClass.name}`);
			if (entry.UUID === undefined)
				Log.error(`add ${this.memoryCacheManager.entryName}: entry has no UUID`);
			if (!ignoreExist && global[`${this.entryName}s`][entry.UUID]) {
				throw new Error(`RuntimeCacheManager-${this.entryName}-add: entry has existed`);
			}
			return (global[`${this.entryName}s`][entry.UUID] = entry);
		} catch (e) {
			throw e;
			return;
		}
	}

	modify(entry, modifyOptions) {
		if (entry === undefined) throw new Error('entry is undefined');
		if (entry.UUID === undefined)
			throw new Error(`modify ${this.memoryCacheManager.entryName}: entry has no UUID`);
		if (this.memoryCacheManager.modify(entry, modifyOptions)) {
			return (global[`${this.entryName}s`][entry.UUID] = Object.assign(entry, modifyOptions));
		}
	}

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
		_.forEach(memoryEntries, (memory, UUID) => {
			try {
				const entry = instantiate(memory, that.entryClass);
				if (entry !== undefined) that.add(entry, { ignoreExist: true });
				else if (UUID !== undefined) this.memoryCacheManager.delete(UUID);
			} catch (e) {
				throw e;
			}
		});
	}
}
