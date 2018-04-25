import { ErrorMapper } from './utils/ErrorMapper';
import { reboot } from './reboot';
// import * as _ from 'lodash';

export const Loop = ErrorMapper.wrapLoop(() => {
	try {
		/**
		 * Reboot
		 */
		if (!global['hasRoot']) reboot();

		/**
		 * CreepManager
		 * 检查creep的post有没有装载
		 * 没有的话就走装载流程
		 */

		/**
		 * 检查房间状态
		 * 包括房间是否需要切换状态，生成新的合同，订单等
		 */
		// RoomManager.check();
		// ClockManager.tick();
	} catch (e) {
		if (e instanceof Error) throw e;
		else throw new Error(e);
	}
});
