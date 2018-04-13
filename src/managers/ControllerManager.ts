/**
 * Author: Ruo
 * Create: 2018-04-10
 * Description:
 */
import { Manager } from './Manager';

export class ControllerManager extends Manager {
	constructor() {
		super('controller');
	}

	// addEntry(obj: StructureController): RoomObject[] {
	//   this.memory.entries[obj.id] = {
	//     level: obj.level,
	//     progress: obj.progress,
	//     progressTotal: obj.progressTotal,
	//     my: obj.my,
	//   };
	//   return this.entries;
	// }

	// clean() {}
}
