/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description: 帧缓存管理器
 */

export class TickCacheManager {
	constructor() {
		this.list = {};
	}
	push(entry) {
		this.list[entry.id] = {
			entry,
			time: Game.time,
		};
		return entry;
	}
	get(id) {
		const e = this.list[id];
		if (e && e.time === Game.time) return e;
		else {
			delete this.list[id];
			return undefined;
		}
	}
}
