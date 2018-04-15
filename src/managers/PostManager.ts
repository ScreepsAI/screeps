/**
 * Author: Ruo
 * Create: 2018-04-11
 * Description:
 */
import * as _ from 'lodash';
import { Manager } from './Manager';
import { Post } from '../posts/Post';

/**
 * 合同管理器
 */
export class PostManager extends Manager {
    constructor() {
        super('post');
    }

    get noPosterPosts() {
        return _.filter(this.entries, p => !p.poster && p.target);
    }

    get noTargetPosts() {
        return _.filter(this.entries, p => p.poster && !p.target);
    }

    get emptyPosts() {
        return _.filter(this.entries, p => !p.poster && !p.target);
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
    addPost(post: Post): void {
        this.entries[post.id] = post;
        this.memory.entries[post.id] = post.raw;
    }

    /**
     * 用目标id查询相关合同
     * @param targetId 
     */
    getByTarget(targetId: string): Post[] | undefined {
        if (targetId) return _.filter(this.entries, (p) => p.targetId && p.targetId.indexOf(targetId) >= 0);
        else return;
    }

    /**
     * 用执行者id查询相关合同
     * @param posterId 
     */
    getByPoster(posterId: string) {
        if (posterId) return _.filter(this.entries, (p) => p.posterId && p.posterId.indexOf(posterId) >= 0);
        else return false;
    }

    /**
     * 处理无人在岗的合同
     * 安排生产新的creep来填补岗位
     */
    dealwithNoPosterPosts(): void {
        _.forEach(this.noPosterPosts, (post: Post) => {
            SpawnManager.createOrderByPost(post);
        });
    }

    /**
     * 检查筛选出无人在岗合同
     */
    checkIdlePost() {
        _.forEach(this.entries, (entry, index) => {
            console.log(entry, index);
        });
    }

    clean() { }

    /**
	 * 是指从Memory恢复数据到global中
	 */
    rebootFromMemory(): void {
        const that = this;
        this.entries = {};
        _.forEach(this.memory.entries, (post) => {
            const { postType, posterId: poster, targetId: target, bodyNeed, id, options } = post;
            that.entries[id] = new Post(postType, poster, target, bodyNeed, id, options);
        });
        Log.success(`Reboot ${_.padEnd(that.name, 20, ' ')} have ${Object.keys(that.entries).length} posts`);
    }
}
