import { ErrorMapper } from './utils/ErrorMapper';
import { Reboot } from './reboot';
import * as _ from 'lodash';
// Main Loop
// 解析 SourceMap , 统一错误处理
export const Loop = ErrorMapper.wrapLoop(() => {
	try {
		/**
		 * Reboot
		 */
		if (!hasRoot) Reboot();
		Clocks.tick();

		/**
		 * CreepManager
		 * 检查creep的post有没有装载
		 * 没有的话就走装载流程
		 */


		/**
		 * 检查房间状态
		 * 包括房间是否需要切换状态，生成新的合同，订单等
		 */
		RoomManager.check();

		_.forEach(Game.creeps, (creep: Creep) => {
			/**
			 * 检查creep是否有工作
			 * 没有工作的，暂时不回收
			 * 有工作的执行工作流程
			 */
		});
	} catch (e) {
		// console.log(e.stack || e.message);
		Log.error(e.stack || e.message);
		// global.hasRoot = false;
	}
});
