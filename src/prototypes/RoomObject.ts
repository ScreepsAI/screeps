// Object.defineProperties(RoomObject.prototype, {
// 	targetOf: {
// 		get(): number {
// 			return _.filter(Memory.creeps, (c: CreepMemory) => c.target === this.id).length;
// 		},
// 	},
// });
// RoomObject.prototype.findClosestRoom = function(): Room {
// 	let tempRoom: Room = target.room;
// 		let spawn = target.room.mySpawn[0];
// 		if (!spawn) { // target room has no spawn
// 			let l: number;
// 			_.forEach(Game.rooms, (room) => {
// 				const lt = Game.map.getRoomLinearDistance(room.name, target.room.name);
// 				if (!l || lt < l) {
// 					l = lt;
// 					tempRoom = room;
// 				}
// 			});
// 			spawn = tempRoom.mySpawn[0];
// 		}
// 		return spawn;
// }
