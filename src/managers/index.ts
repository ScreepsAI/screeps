import * as _ from 'lodash';
import { Manager } from './Manager';
import { CreepManager } from './CreepManager';
import { RoomManager } from './RoomManager';
import { SpawnManager } from './SpawnManager';

export const InitManager = () => {
	const ManagerList: Manager[] = [new CreepManager(), new SpawnManager()];

	_.each(ManagerList, (manager: Manager) => {
		global[manager.name] = manager;
	});
};
