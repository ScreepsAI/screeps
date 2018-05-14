/**
 * Creep
 */
import _ from 'lodash';
Creep.existCheckKeyArray = ['id'];
Creep.className = 'Creep';
Creep.prototype.className = 'Creep';
class CreepExtend extends Creep {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'id', 'spawning', 'hasHurt'];
	}

	get hasHurt() {
		return this.hits < this.hitsMax;
	}

	get emptyBag() {
		return _.reduce(this.carry, (sum, v) => (sum += v)) === 0;
	}

	get fullBag() {
		return _.reduce(this.carry, (sum, v) => (sum += v)) === this.carryCapacity;
	}

	/**
	 * 查找对象
	 * @param type
	 * @param room
	 * @param range
	 */
	find(type, room, range, opts) {}
}

Object.defineProperties(Creep.prototype, Object.getOwnPropertyDescriptors(CreepExtend.prototype));
