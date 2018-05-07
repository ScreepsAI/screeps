/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';
class ConstructionSiteExtend extends ConstructionSite {
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
	ConstructionSite.prototype,
	Object.getOwnPropertyDescriptors(ConstructionSiteExtend.prototype),
);
