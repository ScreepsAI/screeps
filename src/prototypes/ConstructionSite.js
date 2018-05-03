/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */

class ConstructionSiteExtend extends ConstructionSite {
	get raw() {
		const { UUID, id } = this;
		return { UUID, id };
	}
}
Object.defineProperties(
	ConstructionSite.prototype,
	Object.getOwnPropertyDescriptors(ConstructionSiteExtend.prototype),
);
