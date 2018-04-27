import * as _ from 'lodash';
import { Manager } from './Manager';
import { RoomManager } from './RoomManager';
// import { ControllerManager } from './ControllerManager';
// import { SourceManager } from './SourceManager';
// import { SpawnManager } from './SpawnManager';
// import { ExtensionManager } from './ExtensionManager';
// import { ConstructionSiteManager } from './ConstructionSiteManager';
// import { ContainerManager } from './ContainerManager';
// import { CreepManager } from './CreepManager';
// import { PostManager } from './PostManager';
// import { PathManager } from './PathManager';
// import { ClockManager } from './ClockManager';

export const InitManager = () => {
	// global['ControllerManager'] = new ControllerManager();
	// global['PathManager'] = new PathManager();
	// global['ContainerManager'] = new ContainerManager();
	// global['SourceManager'] = new SourceManager();
	// global['SpawnManager'] = new SpawnManager();
	// global['ExtensionManager'] = new ExtensionManager();
	// global['ConstructionSiteManager'] = new ConstructionSiteManager();
	// global['CreepManager'] = new CreepManager();
	// global['ClockManager'] = new ClockManager();
	// global['PostManager'] = new PostManager();
	global['RoomManager'] = new RoomManager();
};
