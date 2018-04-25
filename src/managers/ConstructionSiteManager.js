/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import { Manager } from './Manager';

export class ConstructionSiteManager extends Manager {
	constructor() {
		super('constructionSite');
		this.clean();
		this.rebootFromMemory();
	}
}
