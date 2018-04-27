/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */

class ControllerExtend extends StructureController {
	get raw() {
		const { UUID, id } = this;
		return { UUID, id };
	}
}
Object.defineProperties(
	StructureController.prototype,
	Object.getOwnPropertyDescriptors(ControllerExtend.prototype),
);
