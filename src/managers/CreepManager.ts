import * as _ from 'lodash';
import { Manager } from './Manager';
// import { Emoji } from '../utils/Emoji';
// import { Behaviours } from '../creeps/behaviours';

export class CreepManager extends Manager {
	constructor() {
		super('creep');
	}

	/**
	 * 检查是否有空闲的myCreep
	 */
	checkIdle(room: Room) {
		_.forEach(room.myCreep, (creep: Creep) => {});
	}

	// public run(): void {
	// 	this.clean();
	// 	_.forEach(Game.creeps, (creep: Creep) => {
	// 		this.work(creep);
	// 	});
	// 	this.recordUpdateTime();
	// }
	//
	// public work(creep: Creep): void {
	// 	// TODO: 简单试例
	// 	if (_.isUndefined(creep.target)) return;
	// }
	//

	public clean(): void {
		// _.forEach(Memory.creeps, (creep: CreepMemory, name: string) => {
		// if (!Game.creeps[name]) {
		// 	if (creep.hasBorn) {
		// 		delete Memory.creeps[name];
		// 		console.log(Emoji.skull, Dye('black', creep.name, 'was dead'));
		// 	}
		// } else {
		// 	if (!creep.hasBorn && !Game.creeps[name].spawning) {
		// 		creep.hasBorn = true;
		// 		Log.success(creep.name, 'was born !');
		// 	}
		// }
		// });
	}
}
