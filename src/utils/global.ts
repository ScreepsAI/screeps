// eslint-disable-block
import * as _ from 'lodash';
// 间隔执行
export function setTickout(func: Function, ticks: number): void {
	if (Game.time % ticks === 0) func();
}

export function getUsername() {
	const room = _.filter(Game.rooms, (o: Room) => o.controller ? o.controller.my : false)[0];
	const controller = (<Room>room).controller;
	if (room && controller) return controller.owner.username;
}

/**
 * 给Room对象定义可读参数，who为参数修饰符（my|ally|hostile）
 * 描述：调用target的指定参数，即是指对filter使用filterFunction方法过滤出并返回结果
 * extendObject为参数描述列表，即可以同时定义多个，extendObject中k的value为修饰符列表，即可以如下定义：
 * {creeps: [my|ally|hostile]}，就会定义myCreeps，hostileCreeps和allyCreeps
 * @param target Manager
 * @param extendObject {kinds: [my|ally|hostile], filter: {my:,...}}
 */
export const define = function (target: any, extendObject: any): void {
	let defineFunction = function defineFunction(k: string, filter: Function, who?: any) {
		let K = _.upperFirst(k); // Creep
		let iK = (who === undefined) ? k : (who + K); // myCreep | creep
		let _iK = '_' + iK; // _myCreep | _creep
		Object.defineProperties(target, {
			[iK]: {
				configurable: true,
				enumerable: true,
				get: function () {
					let room = global.caches.rooms[this.name];
					if (!room) room = {};
					if (!room[_iK]) room[_iK] = {};
					if (!room[_iK].data || room[_iK].time < Game.time) {
						room[_iK].data = filter.bind(this)();
						room[_iK].time = Game.time;
					}
					return room[_iK].data;
				},
			},
		});
	};
	_.each(extendObject, (value, key) => { // value: [my|ally|hostile], key: creep
		if (value.kinds.length > 0) {
			_.each(value.kinds, index => defineFunction(key, value.filter[index], index)); // defineFunction(creep, my);
		} else {
			defineFunction(key, value.filter); // 没有修饰符时
		}
	});
};
