/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */

class ContainerExtend extends StructureContainer {
	get raw() {
		const { UUID, id } = this;
		return { UUID, id };
	}
}
Object.defineProperties(
	StructureContainer.prototype,
	Object.getOwnPropertyDescriptors(ContainerExtend.prototype),
);
