/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import _ from 'lodash';
import { Manager } from './Manager';
import { Post } from '../posts/Post';

/**
 * 合同管理器
 */
export class PostManager extends Manager {
	constructor() {
		super('post');
		this.clean();
		this.rebootFromMemory();
	}

	get untreatedPosts() {
		return _.filter(this.entries, p => p.status === 0);
	}

	get emptyEntriesPosts() {
		return _.filter(this.entries, p => !p.entries);
	}

	get treatedPosts() {
		return _.filter(this.entries, p => p.status > 0);
	}

	/**
	 * 检查post列表
	 * 并执行post
	 */
	check() {
		/**
		 * 暂时指定有执行者有目标的合同为默认考虑执行的
		 */
		const posts = this.entries;
		_.forEach(posts, post => {
			post.launch();
		});
	}

	/**
	 * @param {string} postType 合同类型，合同名称
	 * @param {string[]} poster 合同执行者id，可以是多个人一起签署
	 * @param {string[]} target 合同执行目标id，可以有多个目标对象
	 * @param {BodyPartConstant[]} [bodyNeed] 合同执行目标id，可以有多个目标对象
	 */

	/**
	 * 记录合同内容
	 * @param {Post} post
	 */
	addPost(post) {
		this.entries[post.id] = post;
		this.memory.entries[post.id] = post.raw;
	}

	/**
	 * 用目标查询相关合同
	 * @param targetId / targetName
	 */
	getPostByIdOrNameFromMemory(idOrName) {
		if (idOrName) {
			return _.filter(this.memory.entries, post => {
				if (post.entriesId) {
					const searchRes = _.filter(post.entriesId, ids => _.includes(ids, idOrName));
					if (searchRes.length) return true;
					else return false;
				}
				if (post.entriesName) {
					const searchRes = _.filter(post.entriesName, names => _.includes(names, idOrName));
					if (searchRes.length) return true;
					else return false;
				}
				return false;
			});
		} else return undefined;
	}

	/**
	 * 处理无人在岗的合同
	 * 安排生产新的creep来填补岗位
	 */
	dealwithUntreatedPosts() {
		_.forEach(this.untreatedPosts, post => {
			SpawnManager.createOrderByPost(post);
		});
	}

	/**
	 * 检查筛选出无人在岗合同
	 */
	// checkIdlePost() {
	//     _.forEach(this.entries, (entry, index) => {
	//         console.log(entry, index);
	//     });
	// }

	/**
	 * 是指从Memory恢复数据到global中
	 */
	rebootFromMemory() {
		const that = this;
		this.entries = {};
		_.forEach(this.memory.entries, post => {
			let { postType, entriesId, entriesName, bodyNeed, id, options, status } = post;
			if (PostModules[postType]) {
				that.entries[id] = new PostModules[postType]({
					postType,
					entriesId,
					entriesName,
					bodyNeed,
					id,
					options,
					status,
				});
			}
		});
		Log.success(
			`Reboot ${_.padEnd(that.name, 20, ' ')} have ${Object.keys(that.entries).length} posts`,
		);
	}

	// addPosterName(postId: string, posterName: string) {
	//     this.entries[postId].posterName
	// }
}
