/**
 * Author: Ruo
 * Create: 2018-04-10
 * Description:
 */
import * as _ from 'lodash';
import { Manager } from './Manager';

export class SourceManager extends Manager {
	constructor() {
		super('source');
		this.clean();
		this.rebootFromMemory();
	}
	/**
	 * 清理出没有工人的合同
	 */
	// cleanPost() {}

	add(source) {
		source.accessibleFields = source.pos.getRawAccessibleFields();
		if (this.checkExist()) super.add(source);
	}

	/**
	 * 创建岗位信息
	 * 并递交给PostManager
	 * 添加options: {
	 *    status: 'not-dealwith',
	 * }
	 */
	// createPost(creeps, sources, adjacents) {
	// 	_.forEach(adjacents, () => {
	// 		// 暂时不记录固定工位
	// 		const minerPost = new MinerPost({
	// 			entries: {
	// 				creeps: creeps,
	// 				sources: sources,
	// 			},
	// 			status: 0, // 0: 没有被处理的合同
	// 		});
	// 		PostManager.addPost(minerPost);
	// 	});
	// }

	/**
	 * 给予任务
	 * @param creep
	 */
	// givePost(creep: Creep) { }
}
