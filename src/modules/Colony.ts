import { RoomStatus, RoomType } from '../enums/room';

/**
 * 领地类，表示一个room对象
 */
class Colony {
	room: Room;
	status: RoomStatus;
	type: RoomType;
	constructor(room: Room) {
		this.room = room;
	}

	// 分析colony数据
	statistic() {}

	// 初始化conoly的内存数据
	initColonyMenory() {}

	/**
	 * 检查房间的数据缓存，决定是否要改变状态
	 * 难点在于如何每一项检查结果的优先级，让其可以真实的反应需要的急迫性
	 */
	check() {
		// 检查是否有外敌入侵：是否需要防御，反击
		// 检查能量存量：是否需要集中采集
		// 检查基础设施：是否需要维护，是否需要扩建等
		// 检查资源点状态：耗尽，工位占满等
		// 检查creep情况：是否有闲置，受伤无法移动等
	}
}
export { Colony };
