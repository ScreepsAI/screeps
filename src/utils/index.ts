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
	makeRoomUrl(name: string): string {
		return `<a href="#!/room/${Game.shard.name}/${name}">${name}</a>`;
	},
	makeFlagUrl(name: string): string {
		return `<a href="#!/room/${Game.shard.name}/${(<Room>Game.flags[name].room).name}">${name}</a>`;
	},
};

export const Install = (name: any, main: object, extend?: object): void => {
	if (_.isString(name)) {
		global[name] = main;
		if (extend) _.assign(global[name], extend);
	} else {
		_.assign(name, main);
		if (extend) _.assign(name, extend);
	}
};

export const Loop = (main: any): Function | void => {
	const name = main.namespace;
	if (_.isUndefined(name)) return;
	if (_.isUndefined(global[name])) Install(name, new main());
	return global[name].loop();
};

export const getUsername = () =>
	_(Game.rooms)
		.map('controller')
		.filter('my')
		.map('owner.username')
		.first();
