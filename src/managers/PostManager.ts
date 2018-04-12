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
    noPosterPost = {};
    noTargetPost = {};
    emptyPost = {};
    constructor() {
        super('post');
        this.memory.noPosterPost = {};
        this.memory.noTargetPost = {};
        this.memory.emptyPost = {};
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
     * @param {string} type 表示合同的状态
	 */
    addPost(post: Post): object {
        const type = this.getPostType(post);
        if (this.memory.entries[post.id] === undefined) {
            const { id, postType, posterId, targetId, bodyNeed } = post;
            console.log(post.targetId);
            // this.memory.entries[post.id] = {
            //     id,
            //     postType,
            //     posterId,
            //     targetId,
            //     bodyNeed,
            // };
            // if (type === 'normal') this.entries[post.id] = post;
            // else if (type === 'noPoster') this.memory.noPosterPost[post.id] = post;
            // else if (type === 'noTarget') this.memory.noTargetPost[post.id] = post;
            // else if (type === 'empty') this.memory.emptyPost[post.id] = post;
        } else {
            Log.error('same post');
        }

        return this.entries;
    }

    /**
     * 获取合同状态（类型）
     * 合同分为一下几种种:
     * 1.type: 'normal'     参数正常的合同，既有执行者，又有目标
     * 2.type: 'noPoster'   执行者丢失的合同，需要添加执行者，目标已经确定
     * 3.type: 'noTarget'   目标丢失的合同，需要添加目标，但是执行者已经确定
     * 4.type: 'empty'      仅仅知道合同类型，执行者和目标均没有指定的空合同
     */
    getPostType(post: Post) {
        if (!post.poster) {
            if (!post.target) return 'empty';
            else return 'noPoster';
        } else if (!post.target) return 'noTarget';
        else return 'normal';
    }

    /**
     * 用目标id查询相关合同
     * @param targetId 
     */
    getByTarget(targetId: string) {
        return _.filter(this.memory.entries, (p) => p.targetId.indexOf(targetId) >= 0);
    }

    /**
     * 用目标id查询相关合同
     * @param targetId 
     */
    getByPoster(posterId: string) {
        return _.filter(this.memory.entries, (p) => p.posterId.indexOf(posterId) >= 0);
    }

    dealWithNoPosterPost() {
        _.forEach(this.noPosterPost, (post: Post) => {
            global.SpawnManager.createCreepByPost(post);
        });
    }

    checkIdlePost() {
        _.forEach(this.entries, (entry, index) => {
            console.log(entry, index);
        });
    }

    clean() { }
}
