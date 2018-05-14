/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';
StructureContainer.existCheckKeyArray = ['id'];
StructureContainer.className = 'StructureContainer';
StructureContainer.prototype.className = 'StructureContainer';
class ContainerExtend extends StructureContainer {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'id'];
	}
}

Object.defineProperties(
	StructureContainer.prototype,
	Object.getOwnPropertyDescriptors(ContainerExtend.prototype),
);
