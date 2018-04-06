import { Manager } from './Manager';
import { RoomType } from '../enums/room';
import { isFriend } from '../utils';

export class RoomManager extends Manager {
	private roomToc: { [type: number]: Room[] };

	constructor() {
		super('RoomManager');
	}

	public run(): void {
		_.forEach(Game.rooms, (room: Room) => {
			if (room.controller === undefined) {
				if (room.sources.length === 0) {
					// 分割区块的无人区
					return this.signType(room, RoomType.public);
				} else if (room.KeeperLairs.length > 0) {
					// KeeperLair 矿区
					return this.signType(room, RoomType.remoteKeeperLair);
				} else {
					// 区块中央的
					return this.signType(room, RoomType.remoteCenter);
				}
			}
			if (room.controller.my) {
				if (room.spawns.length === 0) {
					// 我的基地
					return this.signType(room, RoomType.home);
				} else {
					// 还没建设spawn的新基地
					return this.signType(room, RoomType.bootstrap);
				}
			}
			const reserver = _.get(room.controller, 'reservation.username');
			if (!_.isUndefined(reserver) && reserver !== ME) {
				// 被别人 Reserved 的分矿
				return this.signType(room, RoomType.remoteReservedByOther);
			}
			const owner = _.get(room.controller, 'owner.username');
			if (_.isUndefined(owner)) {
				// 可以开分矿的房间
				return this.signType(room, RoomType.remoteCanMine);
			} else if (isFriend(owner)) {
				// 朋友的房间
				return this.signType(room, RoomType.ownByFriend);
			} else {
				// 敌人的房间
				return this.signType(room, RoomType.ownByHostile);
			}
		});
	}

	private signType(room: Room, type: number) {
		room.memory.type = type;
		if (!this.roomToc[type]) this.roomToc[type] = [];
		this.roomToc[type].push(room.name);
	}
}
