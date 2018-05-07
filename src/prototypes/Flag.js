/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';
class FlagExtend extends Flag {
	get raw() {
		return _.pick(this, this.paramsList);
	}
	get existCheckKeyArray() {
		return ['name'];
	}

	get paramsList() {
		return ['UUID', 'name'];
	}
}

Object.defineProperties(Flag.prototype, Object.getOwnPropertyDescriptors(FlagExtend.prototype));
