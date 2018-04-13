/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import { Manager } from './Manager';

export class ContainerManager extends Manager {
	constructor() {
		super('container');
	}

	// addEntry(obj: StructureContainer): RoomObject[] {
	//     this.memory.entries[obj.id] = {
	//         id: obj.id,
	//         room: (<Room>obj.room).name,
	//     };
	//     return this.entries;
	// }

	// clean() {}
}
