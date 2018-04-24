// eslint-disable-block
import * as _ from 'lodash';
// 间隔执行
/**
 *
 * @param {Function} func
 * @param {Number} ticks
 */
export function setTickout(func, ticks) {
	if (Game.time % ticks === 0) func();
}

export function getUsername() {
	const room = _.filter(Game.rooms, o => (o.controller ? o.controller.my : false))[0];
	const controller = room.controller;
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
// export const define = function (target, extendObject) {
// 	let defineFunction = function defineFunction(k: string, filter: Function, who?: any) {
// 		let K = _.upperFirst(k); // Creep
// 		let iK = (who === undefined) ? k : (who + K); // myCreep | creep
// 		// let _iK = '_' + iK; // _myCreep | _creep
// 		Object.defineProperties(target, {
// 			[iK]: {
// 				configurable: true,
// 				enumerable: true,
// 				get: function () {
// 					// let room = caches.rooms[this.name];
// 					// if (!room) room = {};
// 					// if (!room[_iK]) room[_iK] = {};
// 					// room[_iK].data = filter.bind(this)();
// 					return filter.bind(this)();
// 				},
// 			},
// 		});
// 	};
// 	_.each(extendObject, (filterObject, key) => {
// 		if (filterObject instanceof Function) { // 没有修饰符时
// 			defineFunction(key, filterObject);
// 		} else {
// 			_.each(filterObject, (filter, who) => {
// 				defineFunction(key, filter, who);
// 			});
// 		}
// 	});
// };
