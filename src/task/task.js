/**
 * Author: Ruo
 * Create: 2018-05-14
 * Description:
 */
import _ from 'lodash';

export class Task {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'bodyNeed', 'opts', 'entryUUIDs'];
	}

	get entriesUUID() {}

	/**
	 * @param UUID
	 * @param bodyNeed
	 * @param opts
	 * @param entryGroups
	 * @param entryUUIDs
	 */
	constructor({
		UUID,
		bodyNeed,
		opts = { needNum: 0, entryClassName: undefined },
		entries = [],
		entryUUIDs = [],
	}) {
		this.UUID = UUID;
		this.bodyNeed = bodyNeed;
		this.opts = opts;
		this.entries = entries;
		this.entryUUIDs = entryUUIDs;
		this.init();
	}

	init() {
		try {
			if (this.opts && this.opts.entryClassName) {
				this.entryManager = global['entryName2Manager'][this.opts.entryClassName];
				if (!this.entryManager) throw new Error(`None manager for: ${this.opts.entryClassName}`);
			} else throw new Error('Task-init: No entryClassName');

			if (this.entries.length === 0 && this.entryUUIDs.length > 0) {
				// 从memory初始化
				_.forEach(this.entryUUIDs, entryUUID => {
					const entry = this.entryManager.get(entryUUID);
					if (entry) this.entries.push(entry);
				});
			} else if (this.entries.length > 0 && this.entryUUIDs.length === 0) {
				// 从对象初始化UUID列表
				_.forEach(this.entries, entry => {
					if (entry.UUID) this.entryUUIDs.push(entry.UUID);
				});
			}
		} catch (e) {
			throw e;
		}
	}

	addEntry(entry) {
		try {
			if (entry.className === this.opts.entryClassName) {
				if (entry.UUID) {
					this.entries.push(entry);
					this.entryUUIDs.push(entry.UUID);
				} else throw new Error(`entry has no UUID`);
			} else
				throw new Error(
					`Task-addEntry: entry's className is not equal to ${this.opts.entryClassName}`,
				);
		} catch (e) {
			Log.error(e);
		}
	}

	setNeedNum(num) {
		this.opts.needNum = num;
	}

	addNeedNum(num) {
		this.opts.needNum += num;
	}

	reduceNeedNum(num) {
		this.opts.needNum -= num;
	}
}
