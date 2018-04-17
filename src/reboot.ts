import { getUsername } from './utils';
import { InitManager } from './managers';

/**
 * 注入 prototypes 并注册新的 global 项目，使用 isRoot 进行检测是否需要重新注入
 */
export const Reboot = (): void => {
	// 运行时环境，内存或者设置只要有一个需要初始化就执行初始化流程
	global['hasRoot'] = true;
	console.log();
	console.log('* * * * * * * * * * * * * * * * * * * * *');
	console.log('* * * * * * * Code Update ! * * * * * * *');
	console.log('* * * * * * * * * * * * * * * * * * * * *');
	console.log();
	console.log(String.fromCodePoint(0x1f503), 'Code Reloading ...');

	/**
	 * 缓存
	 * manager，Define中设计了缓存单帧管理
	 */
	// global.Managers = {};
	global['caches'] = {
		rooms: {},
	};

	// Assign config
	global['myName'] = getUsername();
	if (Memory.config) Memory.config = { CONTROLLER_SIGN_MESSAGE: `Sign by ${global['myName']}` };
	// 不要改 config 引用路径（打包时候不会引入）
	Object.assign(Memory.config, require('config'));
	Object.assign(global, Memory.config);

	// Extend game prototypes
	require('./prototypes');

	// Extend functions
	require('./global');

	InitManager();
	RoomManager.statistic(true);

	// new Clock('clock1', {counter: 1}, function(params: any) {
	//   if (params.counter % 10 === 0) params.counter = 0;
	// 	params.counter += 1;
	// 	Log.info(params.counter);
	// }, 1, true);

	Log.success('Root Done');
};
