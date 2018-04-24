import * as _ from 'lodash';
import { Manager } from './Manager';

/**
 * 用于管理路径
 */
export class PathManager extends Manager {
	constructor() {
		super('path');
		if (!this.memory.entries) this.memory.entries = [];
		this.entries = this.memory.entries;
	}

	/**
	 * 使用对象id查找路径
	 * @param id1
	 * @param id2
	 */
	find(id1, id2) {
		let index;
		if (_.isString(id2)) {
			index = _.findIndex(this.entries, path => {
				return (path.id1 === id1 && path.id2 === id2) || (path.id1 === id2 && path.id2 === id1);
			});
		} else {
			index = _.findIndex(this.entries, path => path.id1 === id1 || path.id2 === id1);
		}
		return { index: index, path: this.entries[index] };
	}

	/**
	 * 添加相关对象的路径
	 * @param id1
	 * @param id2
	 * @param path
	 */
	add(id1, id2, path) {
		console.log(JSON.stringify(this.find(id1, id2)));
		if (this.find(id1, id2).index === -1) {
			this.memory.entries.push({
				id1,
				id2,
				path,
				f: 0,
			});
		} else {
			Log.error('有关路径已经被添加');
		}
	}

	/**
	 * 使用path索引获取路径数据
	 * @param index
	 */
	getByIndex(index) {
		return this.entries[index];
	}

	rebootFromMemory() {
		const that = this;
		if (!_.isArray(this.memory.entries)) this.memory.entries = [];
		this.entries = this.memory.entries;
		// _.forEach(Object.keys(this.memory.entries), (entry) => {
		// 	that.entries.push(entry);
		// })
		Log.success(
			`Reboot ${_.padEnd(that.name, 20, ' ')} have ${Object.keys(that.entries).length} entries`,
		);
	}

	clean() {}
}
