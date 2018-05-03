/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description: 路径对象
 */
import { UUID as UUIDCreator } from '../utils/global';

export class Path {
	static existCheckKeyArray = ['id1', 'id2'];
	constructor({ UUID, id1, id2, path, f }) {
		Object.assign(this, { UUID, id1, id2, path, f });
		if (this.UUID === undefined) this.UUID = UUIDCreator();
	}

	get raw() {
		const { UUID, id1, id2, path, f } = this;
		return { UUID, id1, id2, path, f };
	}
}
