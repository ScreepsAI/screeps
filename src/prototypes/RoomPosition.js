class RoomPositionExtend extends RoomPosition {
	get raw() {
		return {
			x: this.x,
			y: this.y,
			roomName: this.roomName,
		};
	}

	get room() {
		return Game.rooms[this.roomName];
	}

	// 获取坐标点为中心，range为半径的正方形范围内的有效坐标对象数组
	getAdjacent(range = 1) {
		const adjacentPos = [];
		for (let _x = -range; _x <= range; _x++) {
			for (let _y = -range; _y <= range; _y++) {
				const x = this.x + _x;
				const y = this.y + _y;
				if (_x === 0 && _y === 0) continue;
				if (x >= 0 && x <= 49 && y >= 0 && y <= 49)
					adjacentPos.push(new RoomPosition(x, y, this.roomName));
			}
		}
		return adjacentPos;
	}

	// 获取坐标点为中心，range为半径的正方形范围内的有效坐标对象的字面量数组
	getRawAdjacent(range = 1) {
		return _.map(this.getAdjacent(range), p => p.raw);
	}

	// 获取坐标点为中心，range为半径的正方形范围内不是墙体的坐标对象数据
	getAccessibleFields(range = 1) {
		return _.filter(this.getAdjacent(range), pos => pos.terrain !== 'wall');
	}

	// 获取坐标点为中心，range为半径的正方形范围内不是墙体的坐标对象字面量数据
	getRawAccessibleFields(range = 1) {
		return _.map(this.getAccessibleFields(range), p => p.raw);
	}

	getPositionByDirection(direction) {
		switch (direction) {
			case TOP:
				return new RoomPosition(this.x, this.y - 1, this.roomName);
			case TOP_RIGHT:
				return new RoomPosition(this.x + 1, this.y - 1, this.roomName);
			case RIGHT:
				return new RoomPosition(this.x + 1, this.y, this.roomName);
			case BOTTOM_RIGHT:
				return new RoomPosition(this.x + 1, this.y + 1, this.roomName);
			case BOTTOM:
				return new RoomPosition(this.x, this.y + 1, this.roomName);
			case BOTTOM_LEFT:
				return new RoomPosition(this.x - 1, this.y + 1, this.roomName);
			case LEFT:
				return new RoomPosition(this.x - 1, this.y, this.roomName);
			case TOP_LEFT:
				return new RoomPosition(this.x - 1, this.y - 1, this.roomName);
			default:
				return new RoomPosition(this.x, this.y, this.roomName);
		}
	}
}

Object.defineProperties(
	RoomPosition.prototype,
	Object.getOwnPropertyDescriptors(RoomPositionExtend.prototype),
);
