/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import { Manager } from './Manager';

export class ConstructionSiteManager extends Manager {
	constructor() {
		super('constructionSite');
	}

	// addEntry(obj: ConstructionSite): RoomObject[] {
	//     this.memory.entries[obj.id] = {
	//         id: obj.id,
	//         room: (<Room>obj.room).name,
	//         my: obj.my,
	// 		owner: obj.owner,
	//     };
	//     return this.entries;
	// }

	clean() {}
}
