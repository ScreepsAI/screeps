/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description: MinerPost - 矿工合同
 *
 * =====================  以下内容每份合同必须带上  ==============================
 * Post是由各资源Manager负责创建和发布的认领信息，由PostManager负责管理和维护
 * Post记录一份工作的相关信息并决定哪些是需要存档在Memory中的
 * Post有固有字段和特有字段，即不同的工作除了基本信息外会有各自需要记录的信息
 * 特有字段必须是字面量，以便于扁平化处理
 * ----------------------------------------------------------------------------
 * CreepManager检查出没有任何工作的creep，这些过滤出来的creep将分别认领这些工作合同
 * 认领完，如果人多，则回收，如果人少则将剩下的job合同递交给spawn生产需要的creep
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
