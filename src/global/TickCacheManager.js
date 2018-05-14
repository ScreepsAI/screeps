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
		const tickEntry = this.list[UUID];
		if (tickEntry && tickEntry.time === Game.time) return tickEntry.entry;
		else delete this.list[UUID];
	}

	getEntries() {
		return _.filter(this.list, tickEntry => {
			if (tickEntry && tickEntry.time === Game.time) return true;
			else return false;
		});
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
