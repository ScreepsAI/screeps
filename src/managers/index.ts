import _ from 'lodash';
import { Manager } from './Manager';
import { CreepManager } from './CreepManager';
import { RoomManager } from './RoomManager';
import { SpawnManager } from './SpawnManager';

export const InitManager = () => {
	const ManagerList: Manager[] = [new CreepManager(), new RoomManager(), new SpawnManager()];

	_.forEach(ManagerList, (manager: Manager) => {
		global[manager.name] = manager;
	});
};
