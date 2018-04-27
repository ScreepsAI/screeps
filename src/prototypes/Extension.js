/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */

class ExtensionExtend extends StructureExtension {
	get raw() {
		const { UUID, id } = this;
		return { UUID, id };
	}
}
Object.defineProperties(
	StructureExtension.prototype,
	Object.getOwnPropertyDescriptors(ExtensionExtend.prototype),
);
