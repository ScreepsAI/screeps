/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import { Manager } from './Manager';

export class ExtensionManager extends Manager {
	constructor() {
		super('extension');
	}

	// addEntry(obj: StructureExtension) {
	//     this.memory.entries[obj.id] = {
	//         id: obj.id,
	//         room: obj.room.name,
	//         my: obj.my,
	// 		owner: obj.owner,
	//     };
	//     return this.entries;
	// }

	clean() {}
}
