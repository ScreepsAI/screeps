import * as _ from 'lodash';
/**
 * Creep
 */

class CreepExtend extends Creep {
	get isHurt() {
		return this.hits < this.hitsMax;
	}
	/**
	 * 判断creep是否用指定array中的part类型，有一个就返回
	 */
	hasBodyParts(partTypes, start = 0) {
		const body = this.body;
		const limit = body.length;
		if (!_.isArray(partTypes)) partTypes = [partTypes];
		for (let i = start; i < limit; i++) {
			if (_.includes(partTypes, body[i].type)) return true;
		}
		return false;
	}
	/**
	 * 判断是否有可用的part
	 */
	hasActiveBodyparts(partTypes) {
		return this.hasBodyParts(partTypes, this.body.length - Math.ceil(this.hits * 0.01));
	}
	/**
	 * 获取指定类型的部件数量
	 */
	getBodyparts() {
		return null;
	}
}
Object.defineProperties(Creep.prototype, Object.getOwnPropertyDescriptors(CreepExtend.prototype));
