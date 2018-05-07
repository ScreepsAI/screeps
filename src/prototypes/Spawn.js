/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description:
 */
import _ from 'lodash';
class SpawnExtend extends StructureSpawn {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get existCheckKeyArray() {
		return ['id'];
	}

	get paramsList() {
		return ['UUID', 'id'];
	}
}
Object.defineProperties(
	StructureSpawn.prototype,
	Object.getOwnPropertyDescriptors(SpawnExtend.prototype),
);
