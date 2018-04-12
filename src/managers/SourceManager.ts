/**
 * Author: Ruo
 * Create: 2018-04-10
 * Description:
 */
import * as _ from 'lodash';
import { Manager } from './Manager';
import { MinerPost } from '../posts/miner';

export class SourceManager extends Manager {
	posts: object;
	constructor() {
		super('source');
		this.posts = {};
	}

	/**
	 * 从Memory中初始化post列表
	 */
	initPosts() {}

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

	/**
	 *
	 * @param {IdOjects} obj
	 * @returns {RoomObject[]}
	 */
	// addEntry(obj: Source): RoomObject[] {
	//   this.memory.entries[obj.id] = {
	//     id: obj.id,
	//     room: obj.room.name,
	//   };
	//   return this.entries;
	// }

	/**
	 * 创建岗位信息
	 * 并递交给PostManager
	 */
	createPost(poster: Creep[], target: Source[], adjacents: RoomPosition[]) {
		// const that = this;
		_.forEach(adjacents, () => {
			const minerPost = new MinerPost(poster, target);
			global.PostManager.addEntry(minerPost);
			// that.addPost(postId, {
			//   pos: adjacent,
			//   poster: poster,
			//   target: target,
			// });
		});
	}

	/**
	 * 给予任务
	 * @param creep
	 */
	givePost(creep: Creep) {}

	/**
	 * 清理工位信息，确认每个工位是否已经被存在的creep招领
	 */
	clean() {}
}
