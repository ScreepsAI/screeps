/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import { Manager } from './Manager';

export class ContainerManager extends Manager {
	constructor() {
		super('container');
		this.clean();
		this.rebootFromMemory();
	}
}
