/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import { Manager } from './Manager';
import { Post } from '../posts/Post';

export class PostManager extends Manager {
	constructor() {
		super('post');
	}
	/**
	 * @param {string} postType 合同类型，合同名称
	 * @param {string[]} poster 合同执行者id，可以是多个人一起签署
	 * @param {string[]} target 合同执行目标id，可以有多个目标对象
	 * @param {BodyPartConstant[]} bodyNeed 合同执行目标id，可以有多个目标对象
	 */

	/**
	 * 记录合同内容
	 */
	addEntry(post: Post): object {
		if (this.memory.entries[post.id] === undefined) {
			const { id, postType, bodyNeed } = post;
			let poster, target;
			if (post.poster instanceof Creep) {
				poster = post.poster.id;
			} else if (post.poster instanceof Array) {
			}
			this.memory.entries[post.id] = {
				id,
				postType,
				bodyNeed,
			};
			this.entries[post.id] = post;
		} else {
			Log.error('same post');
		}

		return this.entries;
	}

	clean() {}
}
