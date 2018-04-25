/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import { Manager } from './Manager';

export class ExtensionManager extends Manager {
	constructor() {
		super('extension');
		this.clean();
		this.rebootFromMemory();
	}
}
