/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description: 帧缓存管理器
 */

export class TickCacheManager {
	constructor(runtimeCacheManager) {
		this.runtimeCacheManager = runtimeCacheManager;
		this.setEmpty();
	}

	get(UUID) {
		const entry = this.list[UUID];
		if (entry && entry.time === Game.time) return entry;
		else {
			delete this.list[UUID];
			return this.runtimeCacheManager.get(UUID);
		}
	}

	getEntries() {
		return this.list;
	}

	add(entry) {
		this.list[entry.UUID] = {
			entry,
			time: Game.time,
		};
		return entry;
	}

	delete(UUID) {
		delete this.list[UUID];
	}

	setEmpty() {
		this.list = {};
	}
}
