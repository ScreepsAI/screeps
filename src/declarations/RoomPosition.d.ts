/**
 * RoomPosition的字面量对象
 */
interface RawPosition {
	x: number;
	y: number;
	roomName: string;
}

interface RoomPosition {
	raw: RawPosition;
	room: Room;
	terrain: Terrain;
	structures: Structure[];

	getAdjacent(range?: number): RoomPosition[]; // 获取坐标点为中心，range为半径的正方形范围内的有效坐标对象数组

	getRawAdjacent(range?: number): any[]; // 获取坐标点为中心，range为半径的正方形范围内的有效坐标对象的字面量数组

	getAccessibleFields(range?: number): RoomPosition[]; // 获取坐标点为中心，range为半径的正方形范围内不是墙体的坐标对象数据

	getRawAccessibleFields(range?: number): any[]; // 获取坐标点为中心，range为半径的正方形范围内不是墙体的坐标对象字面量数据
}
