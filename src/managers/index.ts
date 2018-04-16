import * as _ from 'lodash';
import { Manager } from './Manager';
import { RoomManager } from './RoomManager';
import { ControllerManager } from './ControllerManager';
import { SourceManager } from './SourceManager';
import { SpawnManager } from './SpawnManager';
import { ExtensionManager } from './ExtensionManager';
import { ConstructionSiteManager } from './ConstructionSiteManager';
import { ContainerManager } from './ContainerManager';
import { CreepManager } from './CreepManager';
import { PostManager } from './PostManager';
import { PathManager } from './PathManager';

export const InitManager = () => {
	const ManagerList: Manager[] = [
		new ControllerManager(),
		new PostManager(),
		new SourceManager(),
		new SpawnManager(),
		new ExtensionManager(),
		new ConstructionSiteManager(),
		new ContainerManager(),
		new CreepManager(),
		new PathManager(),
	];

	global['RoomManager'] = new RoomManager();
	_.each(ManagerList, (manager: Manager) => {
		global[manager.name + 'Manager'] = manager;
	});
};

