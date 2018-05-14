/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';

Flag.existCheckKeyArray = ['name'];
Flag.className = 'Flag';
Flag.prototype.className = 'Flag';

class FlagExtend extends Flag {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'name'];
	}
}

Object.defineProperties(Flag.prototype, Object.getOwnPropertyDescriptors(FlagExtend.prototype));
