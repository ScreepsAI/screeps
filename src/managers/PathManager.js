import * as _ from 'lodash';
import { Manager } from './Manager';
import { Path } from '../global/Path';
import { UUID } from '../utils/global';

/**
 * 用于管理路径
 */
export class PathManager extends Manager {
	constructor() {
		super('path', Path);
	}

	/**
	 * 使用对象id查找路径
	 * @param id1
	 * @param id2
	 * @return {object|undefined} path
	 */
	find(id1, id2) {
		let UUIDs;
		if (_.isString(id2)) {
			// 双坐标点查询
			UUIDs = _.map(
				this.getEntries(),
				path =>
					(path.id1 === id1 && path.id2 === id2) || (path.id1 === id2 && path.id2 === id1)
						? path
						: undefined,
			);
		} else {
			// 单坐标查询
			UUIDs = _.map(
				this.getEntries(),
				path => (path.id1 === id1 || path.id2 === id1 ? path : undefined),
			);
		}
		if (UUIDs.length !== 0) {
			let paths = {};
			_.forEach(UUIDs, UUID => (paths[UUID] = this.runtimeCaches.get(UUID)));
			return paths;
		} else return undefined;
	}

	/**
	 * 添加相关对象的路径
	 * 先查重，不重复则添加，重复则报错
	 * @param id1
	 * @param id2
	 * @param path
	 */
	add(id1, id2, path) {
		if (this.checkExist({ id1, id2 })) super.add(new Path({ id1, id2, path, f: 0 }));
	}

	/**
	 * 使用path索引获取路径数据
	 * @param index
	 */
	getByIndex(index) {
		return this.entries[index];
	}
}
