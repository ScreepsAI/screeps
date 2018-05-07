/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';
class ExtensionExtend extends StructureExtension {
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
	StructureExtension.prototype,
	Object.getOwnPropertyDescriptors(ExtensionExtend.prototype),
);
