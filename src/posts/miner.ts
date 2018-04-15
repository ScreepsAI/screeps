/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description: MinerPost - 矿工合同
 * ============================ 矿工合同说明 ====================================
 * 任务:采集(hervest), 移动至容器(moveToContainer), 移动至矿点(moveToSource), 放置(transfer)
 * 涉及对象:
 * 矿点对象, Creep, 容器对象
 * 状态:到达矿点状态, 背包满状态, 到达容器状态, 背包空状态
 * 输入:当前状态, 中间变量:背包是否满, 输出: 下一刻状态
 * 到达矿点状态->开始执行采集任务->背包满状态->开始执行移动至容器任务->
 * 到达容器状态->开始执行放置任务->背包空状态->开始执行移动至矿点任务->到达矿点状态
 * 
 * 状态寄存器: {
 * 		target: {
 * 			'source1's id': rest energy
 * 		},
 * 		poster: {
 * 		},
 * }
 * ============================================================================
 */

import { Post } from './Post';

/**
 * 矿工合同
 * 该工作内容包含：采集(heavest)，搬运(transfer)
 */
export class MinerPost extends Post {
	/**
	 * @param {string[]|any[]} poster 矿工
	 * @param {string[]|any[]} target 资源source
	 */
	constructor(poster: string[] | Creep[], target: string[] | Source[]) {
		super('miner', poster, target, [MOVE, WORK, CARRY]);
	}
}
