import * as _ from 'lodash';
// import { TargetType } from '../enums/target';
// import { RoleType } from '../enums/creep';
// import { ActionType } from '../enums/action';

/**
 * Creep
 */
Object.defineProperties(Creep.prototype, {
	/**
	 * 签订的合同列表
	 * 仅保存合同的id号
	 */
	posts: {
		get() {
			if (!this._posts)this._posts = {};
			if (!this.memory.posts) this.memory.posts = {};
			else {
				_.forEach(this.memory.posts, (postdata, postId) => {
					this._posts[postId] = postdata;
				})
			}
			return this._posts;
		},
		set(v) {
			this._posts = v;
		},
	},
	isHurt: {
		get(): boolean {
			return this.hits < this.hitsMax;
		},
	},
});

/**
 * 获取指定类型的部件数量
 */
Creep.prototype.getBodyparts = function(partTypes: BodyPartConstant): number {
	return _(this.body)
		.filter({ partTypes })
		.value().length;
};

/**
 * 判断creep是否用指定array中的part类型，有一个就返回
 */
Creep.prototype.hasBodyparts = function(partTypes: BodyPartConstant | BodyPartConstant[], start: number = 0): boolean {
	const body = this.body;
	const limit = body.length;
	if (!_.isArray(partTypes)) partTypes = [partTypes];
	for (let i = start; i < limit; i++) {
		if (_.includes(partTypes, body[i].type)) return true;
	}
	return false;
};

/**
 * 判断是否有可用的part
 */
Creep.prototype.hasActiveBodyparts = function(partTypes: BodyPartConstant | BodyPartConstant[]): boolean {
	return this.hasBodyparts(partTypes, this.body.length - Math.ceil(this.hits * 0.01));
};
