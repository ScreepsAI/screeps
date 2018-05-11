export * from './Raw';
export const Util = {
	// 设置默认值
	setDefault(memory: object, path: string | string[], defaultValue: any): void {
		if (_.isUndefined(_.get(memory, path))) _.set(memory, path, defaultValue);
	},

	// 使用class扩展prototype
	define(main: any, extend: any, isPrototype?: boolean): void {
		if (!isPrototype) {
			// @ts-ignore
			Object.defineProperties(main.prototype, Object.getOwnPropertyDescriptors(extend.prototype));
		} else {
			// @ts-ignore
			Object.defineProperties(main, Object.getOwnPropertyDescriptors(extend.prototype));
		}
	},

	// 生成房间a标签
	link(name: string, title?: string): string {
		return `<a href="#!/room/${Game.shard.name}/${name}">${title || name}</a>`;
	},

	// 从id数组获取对象数组
	getObjectsByIds(ids: string[]): any[] {
		const objs: any[] = [];
		_.forEach(ids, id => objs.push(Game.getObjectById(id)));
		return _.compact(objs);
	},

	// 吧对象数组转换成id数组
	objectsToIds(objs: any[]): string[] {
		const ids: string[] = [];
		_.forEach(objs, obj => {
			if (obj && obj.id) ids.push(obj.id);
		});
		return ids;
	},

	// 目标方向
	getDiretion(from: Pos, to: Pos): number {
		const x = to.x - from.x;
		const y = to.y - from.y;
		if (x === 0 && y < 0) return TOP;
		if (x > 0 && y < 0) return TOP_RIGHT;
		if (x < 0 && y < 0) return TOP_LEFT;
		if (x === 0 && y > 0) return BOTTOM;
		if (x > 0 && y > 0) return BOTTOM_RIGHT;
		if (x < 0 && y > 0) return BOTTOM_LEFT;
		if (x > 0 && y === 0) return RIGHT;
		if (x < 0 && y === 0) return LEFT;
		return 0;
	},

	// 从方向获取坐标
	getDirectionPos(origin: RoomPosition, direction: number): RoomPosition {
		let offsetX = [0, 0, 1, 1, 1, 0, -1, -1, -1];
		let offsetY = [0, -1, -1, 0, 1, 1, 1, 0, -1];
		return new RoomPosition(origin.x + offsetX[direction], origin.y + offsetY[direction], origin.roomName);
	},
};
