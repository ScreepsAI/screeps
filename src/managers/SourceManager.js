/**
 * Author: Ruo
 * Create: 2018-04-10
 * Description:
 */
import * as _ from 'lodash';
import { Manager } from './Manager';
import { MinerPost } from '../posts/miner';

export class SourceManager extends Manager {
	constructor() {
		super('source');
	}

	/**
	 * 清理出没有工人的合同
	 */
	cleanPost() {}

	/**
	 *
	 */
	// addPost(id: number, post: any) {
	//   if (this.memory.posts) this.memory.posts = {};
	//   this.memory.posts[id] = post;
	//   const { pos, poster, target } = post;
	//   this.posts[id] = {
	//     pos: pos.raw,
	//     poster: poster,
	//     target: target.id,
	//   }
	// }

	addEntry(obj) {
		// if (this.memory.entries[obj.id] === undefined) {
		console.log(obj.pos);
		const accessibleFields = obj.pos.getRawAccessibleFields();
		this.memory.entries[obj.id] = {
			accessibleFields,
			maxPosts: accessibleFields.length, // 岗位最大可签约合同数
		};
		// }
		this.entries[obj.id] = obj;
		return this.entries;
	}

	/**
	 * 创建岗位信息
	 * 并递交给PostManager
	 * 添加options: {
	 *    status: 'not-dealwith',
	 * }
	 */
	createPost(creeps, sources, adjacents) {
		_.forEach(adjacents, () => {
			// 暂时不记录固定工位
			const minerPost = new MinerPost({
				entries: {
					creeps: creeps,
					sources: sources,
				},
				status: 0, // 0: 没有被处理的合同
			});
			PostManager.addPost(minerPost);
		});
	}

	/**
	 * 给予任务
	 * @param creep
	 */
	// givePost(creep: Creep) { }

	/**
	 * 清理工位信息，确认每个工位是否已经被存在的creep招领
	 */
	// clean() { }

	/**
	 * 加载Memory数据
	 */
	// rebootFromMemory() {

	// }
}