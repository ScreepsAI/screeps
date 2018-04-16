// import { getGame } from '../utils';

Object.defineProperties(RoomPosition.prototype, {
	raw: {
		get(): RawPosition {
			return {
				x: this.x,
				y: this.y,
				roomName: this.roomName,
			};
		},
	},
	room: {
		get(): Room {
			return Game.rooms[this.roomName];
		},
	},
	entries: {
		configurable: true,
		enumerable: true,
		get: function () { return this.look(); },
	},
	terrain: {
		configurable: true,
		enumerable: true,
		get: function () { return this.lookFor(LOOK_TERRAIN); },
	},
	structures: {
		configurable: true,
		enumerable: true,
		get: function () { return this.lookFor(LOOK_STRUCTURES); },
	},
	// mainStructure: {
	// 	get(): Structure | undefined {
	// 		return _.filter(
	// 			this.structures,
	// 			(s: Structure) => s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_ROAD,
	// 		)[0];
	// 	},
	// },
	// constructionSite: {
	// 	get(): ConstructionSite | undefined {
	// 		return this.cacheLookFor(LOOK_CONSTRUCTION_SITES)[0];
	// 	},
	// },
	// creep: {
	// 	get(): Creep | undefined {
	// 		return this.cacheLookFor(LOOK_CREEPS)[0];
	// 	},
	// },
	// canMoveThrough: {
	// 	get(): boolean {
	// 		return (
	// 			this.terrain !== 'wall' &&
	// 			(_.isUndefined(this.constructionSite) ||
	// 				this.constructionSite.structureType === (STRUCTURE_ROAD || STRUCTURE_RAMPART)) &&
	// 			(_.isUndefined(this.mainStructure) || this.mainStructure.structureType === STRUCTURE_CONTAINER)
	// 		);
	// 	},
	// },
	// canBuild: {
	// 	get(): boolean {
	// 		return this.terrain !== 'wall' && _.isUndefined(this.constructionSite) && _.isUndefined(this.mainStructure);
	// 	},
	// },
});

// ////////////////////////////////
// Functions
// ////////////////////////////////

/**
 * 获取坐标点为中心，range为半径的正方形范围内的有效坐标对象数组
 */
RoomPosition.prototype.getAdjacent = function (range: number = 1): RoomPosition[] {
	const adjacentPos = [];
	for (let _x = -range; _x <= range; _x++) {
		for (let _y = -range; _y <= range; _y++) {
			const x = this.x + _x;
			const y = this.y + _y;
			if (_x === 0 && _y === 0) continue;
			if (x >= 0 && x <= 49 && y >= 0 && y <= 49) adjacentPos.push(new RoomPosition(x, y, this.roomName));
		}
	}
	return adjacentPos;
};

/**
 * 获取坐标点为中心，range为半径的正方形范围内的有效坐标对象的字面量数组
 */
RoomPosition.prototype.getRawAdjacent = function (range: number = 1): any[] {
	return _.map(this.getAdjacent(range), (p) => p.raw);
};

/**
 * 获取坐标点为中心，range为半径的正方形范围内不是墙体的坐标对象数据
 */
RoomPosition.prototype.getAccessibleFields = function (range: number = 1): RoomPosition[] {
	return  _.filter(this.getAdjacent(range), (pos) => pos.terrain != 'wall');
};

/**
 * 获取坐标点为中心，range为半径的正方形范围内不是墙体的坐标对象字面量数据
 */
RoomPosition.prototype.getRawAccessibleFields = function (range: number = 1): RoomPosition[] {
	return _.map(this.getAccessibleFields(range), (p) => p.raw);
};

// RoomPosition.prototype.getPositionInDirection = function(direction: number): RoomPosition {
// 	switch (direction) {
// 		case TOP:
// 			return new RoomPosition(this.x, this.y - 1, this.roomName);
// 		case TOP_RIGHT:
// 			return new RoomPosition(this.x + 1, this.y - 1, this.roomName);
// 		case RIGHT:
// 			return new RoomPosition(this.x + 1, this.y, this.roomName);
// 		case BOTTOM_RIGHT:
// 			return new RoomPosition(this.x + 1, this.y + 1, this.roomName);
// 		case BOTTOM:
// 			return new RoomPosition(this.x, this.y + 1, this.roomName);
// 		case BOTTOM_LEFT:
// 			return new RoomPosition(this.x - 1, this.y + 1, this.roomName);
// 		case LEFT:
// 			return new RoomPosition(this.x - 1, this.y, this.roomName);
// 		case TOP_LEFT:
// 			return new RoomPosition(this.x - 1, this.y - 1, this.roomName);
// 		default:
// 			return new RoomPosition(this.x, this.y, this.roomName);
// 	}
// };
