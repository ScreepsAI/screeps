/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';
ConstructionSite.existCheckKeyArray = ['id'];
ConstructionSite.className = 'ConstructionSite';
ConstructionSite.prototype.className = 'ConstructionSite';
class ConstructionSiteExtend extends ConstructionSite {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'id'];
	}
}

Object.defineProperties(
	ConstructionSite.prototype,
	Object.getOwnPropertyDescriptors(ConstructionSiteExtend.prototype),
);
