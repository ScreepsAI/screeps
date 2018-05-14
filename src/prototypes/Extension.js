/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';
StructureExtension.existCheckKeyArray = ['id'];
StructureExtension.className = 'StructureExtension';
StructureExtension.prototype.className = 'StructureExtension';
class ExtensionExtend extends StructureExtension {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'id'];
	}
}

Object.defineProperties(
	StructureExtension.prototype,
	Object.getOwnPropertyDescriptors(ExtensionExtend.prototype),
);
