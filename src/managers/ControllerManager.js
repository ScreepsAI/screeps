/**
 * Author: Ruo
 * Create: 2018-04-10
 * Description:
 */
import { Manager } from './Manager';

export class ControllerManager extends Manager {
	constructor() {
		super('controller', StructureController);
	}
}
