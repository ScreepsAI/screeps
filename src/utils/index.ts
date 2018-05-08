export * from './Raw';
export const Util = {
	define(main: any, extend: any, isPrototype?: boolean): void {
		if (!isPrototype) {
			// @ts-ignore
			Object.defineProperties(main.prototype, Object.getOwnPropertyDescriptors(extend.prototype));
		} else {
			// @ts-ignore
			Object.defineProperties(main, Object.getOwnPropertyDescriptors(extend.prototype));
		}
	},
	link(name: string, title?: string): string {
		return `<a href="#!/room/${Game.shard.name}/${name}">${title || name}</a>`;
	},
	getObjectsByIds(ids: string[]): any[] {
		const objs: any[] = [];
		_.forEach(ids, id => objs.push(Game.getObjectById(id)));
		return _.compact(objs);
	},
	objectsToIds(objs: any[]): string[] {
		const ids: string[] = [];
		_.forEach(objs, obj => {
			if (obj && obj.id) ids.push(obj.id);
		});
		return ids;
	},
};
