/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description: 载入Managers
 */
import { ControllerManager } from 'Managers/ControllerManager';
import { SourceManager } from 'Managers/SourceManager';
import { SpawnManager } from 'Managers/SpawnManager';
import { ExtensionManager } from 'Managers/ExtensionManager';
import { ConstructionSiteManager } from 'Managers/ConstructionSiteManager';
import { ContainerManager } from 'Managers/ContainerManager';
import { CreepManager } from 'Managers/CreepManager';
// import { PostManager } from 'Managers/PostManager';
// import { PathManager } from 'Managers/PathManager';
// import { ClockManager } from 'Managers/ClockManager';
import { RoomManager } from 'Managers/RoomManager';
import { Policy } from '../policies/Policy';

export const loadManager = () => {
	// global['PathManager'] = new PathManager();
	// global['ClockManager'] = new ClockManager();
	// global['PostManager'] = new PostManager();
	global['ControllerManager'] = new ControllerManager();
	global['SourceManager'] = new SourceManager();
	global['SpawnManager'] = new SpawnManager();
	global['ExtensionManager'] = new ExtensionManager();
	global['ConstructionSiteManager'] = new ConstructionSiteManager();
	global['ContainerManager'] = new ContainerManager();
	global['CreepManager'] = new CreepManager();
	global['RoomManager'] = new RoomManager();
	global['Policy'] = new Policy();
};
