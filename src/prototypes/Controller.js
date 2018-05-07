/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';
class ControllerExtend extends StructureController {
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
	StructureController.prototype,
	Object.getOwnPropertyDescriptors(ControllerExtend.prototype),
);
