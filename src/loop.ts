import { ErrorMapper } from './utils/ErrorMapper';
import { Reboot } from './reboot';
// Main Loop
// 解析 SourceMap , 统一错误处理
export const Loop = ErrorMapper.wrapLoop(() => {
	try {
		/**
		 * Reboot
		 */
		if (!global.hasRoot) Reboot();
		global.Clocks.tick();

		global.RoomManager.check();
	} catch (e) {
		// console.log(e.stack || e.message);
		Log.error(e.stack || e.message);
	}
});
