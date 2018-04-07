import _ from 'lodash';
// 间隔执行
export function setTickout(func: Function, ticks: number): void {
	if (Game.time % ticks === 0) func();
}

export function getUsername(): string {
	return _(Game.rooms)
		.map('controller')
		.filter('my')
		.map('owner.username')
		.first() as string;
}

// 判断是否在白名单
// TODO: 读取 Ally 成员列表
export function isFriend(username: string) {
	return WHITELIST.indexOf(username) !== -1;
}

// 获取游戏对象
export class getGame {
	static flagByName(name: string): Flag {
		return Game.flags[name];
	}

	static flagsByNameArray(nameArray: string[]) {
		const Flags = [] as Flag[];
		_.forEach(nameArray, name => Flags.push(Game.flags[name]));
		return _.compact(Flags);
	}

	static flagsToNameArray(flags: Flag[]): string[] {
		return _.map(flags, 'name');
	}
}

/**
 * 给Manager对象定义可读参数，who为参数修饰符（my|ally|hostile）
 * 描述：调用target的指定参数，即是指对filterObject使用filterFunction方法过滤出并返回结果
 * extendObject为参数描述列表，即可以同时定义多个，extendObject中k的value为修饰符列表，即可以如下定义：
 * {creeps: [my|ally|hostile]}，就会定义myCreeps，hostileCreeps和allyCreeps
 * @param target Manager
 * @param filterObject 一般是指Manager.entries
 * @param filterFunction
 * @param extendObject {k: [my|ally|hostile],}
 */
export const Define = (target: any, filterObject: any, filterFunction: Function | undefined, extendObject: any) => {
	let defineFunction = function(k: string, who?: any) {
		let K = _.upperFirst(k); // Creep
		let iK = _.isUndefined(who) ? K : who + K; // myCreep | Creep
		let _iK = '_' + (_.isUndefined(who) ? k : who + K); // _myCreep
		Object.defineProperties(target.prototype, {
			[iK]: {
				configurable: true,
				enumerable: true,
				get: function() {
					if (filterObject === undefined) filterObject = Memory.Managers[K].entries;
					this.memory[_iK] = _.filter(filterObject, filterFunction);
					return this.memory[_iK];
				},
			},
		});
	};
	_.each(extendObject, (value, key) => {
		// value: [my|ally|hostile], key: creep
		if (value.length > 0) {
			_.each(value, index => {
				// index: my
				defineFunction(key, index); // defineFunction(creep, my);
			});
		} else {
			defineFunction(key); // 没有修饰符时
		}
	});
};
