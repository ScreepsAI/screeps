/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description:
 */
import { Manager } from './Manager';
class ScreepsManager extends Manager {
	constructor(name) {
		super(name);
	}
	/**
	 * =================================================================
	 * my, ally, hostile都是单帧缓存，即只在一个tick内有效的缓存
	 * 且仅仅针对room内的对象设计，而room则独立于Manager之外
	 * =================================================================
	 */

	get my() {
		if (!this.caches._my) this.caches._my = {};
		if (!this.caches._my.data || this.caches._my.time < Game.time) {
			this.caches._my.data = _.filter(this.entries, entry => {
				if (entry instanceof Creep || entry instanceof OwnedStructure) return entry.my;
				else return false;
			});
			this.caches._my.time = Game.time;
		}
		return this.caches._my.data;
	}

	get ally() {
		if (!this.caches._ally) this.caches._ally = {};
		if (!this.caches._ally.data || this.caches._ally.time < Game.time) {
			this.caches._ally.data = _.filter(this.entries, entry => {
				if (entry instanceof Creep || entry instanceof OwnedStructure) {
					if (entry.owner) return WHITELIST.indexOf(entry.owner.username) >= 0;
					else return false;
				}
				return false;
			});
			this.caches._ally.time = Game.time;
		}
		return this.caches._ally.data;
	}

	get hostile() {
		if (!this.caches._hostile) this.caches._hostile = {};
		if (!this.caches._hostile.data || this.caches._hostile.time < Game.time) {
			this.caches._hostile.data = _.filter(this.entries, entry => {
				if (entry instanceof Creep || entry instanceof OwnedStructure) {
					if (entry.owner) return WHITELIST.indexOf(entry.owner.username) < 0;
					else return false;
				}
				return false;
			});
			this.caches._hostile.time = Game.time;
		}
		return this.caches._hostile.data;
	}
}
