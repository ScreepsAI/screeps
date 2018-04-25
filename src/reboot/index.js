/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description:
 */
import './loadPrototypes';
import { loadConfig } from './loadConfig';
import { loadGlobal } from './loadGlobal';
import { loadManager } from './loadManagers';

// import './initManagers';

export const reboot = () => {
	// 运行时环境，内存或者设置只要有一个需要初始化就执行初始化流程
	global['hasRoot'] = true;
	console.log();
	console.log('* * * * * * * * * * * * * * * * * * * * *');
	console.log('* * * * * * * Code Update ! * * * * * * *');
	console.log('* * * * * * * * * * * * * * * * * * * * *');
	console.log();
	console.log(String.fromCodePoint(0x1f503), 'Code Reloading ...');

	loadConfig();
	loadGlobal();
	loadManager();

	Log.success('Root Done');
};
