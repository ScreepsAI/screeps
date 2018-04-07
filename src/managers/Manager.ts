import * as _ from 'lodash';

/**
 * manager 是一个队对象进行管理的工具
 * 包括维护相关的memory
 * 每个manager有:
 * entries
 */
export abstract class Manager {
	public name: string;

	constructor(name: string) {
		this.name = _.upperFirst(name);

		if (_.isUndefined(Memory.Managers)) Memory.Managers = {};

		if (_.isUndefined(Memory.Managers[this.name])) {
			Memory.Managers[this.name] = {};
			Memory.Managers[this.name].entries = {};
		}
	}

	abstract run(): void;

	// 是指清理Manager的entries列表中存在但是游戏中不存在的对象
	abstract clean(): void;

	protected get memory(): any {
		return Memory.Managers[this.name];
	}

	protected set memory(value: any) {
		Memory.Managers[this.name] = value;
	}

	/**
	 * @param {IdOjects[]} entries 管理的对象列表
	 */
	get entries(): IdOjects[] {
		return Memory.Managers[this.name].entries;
	}

	// 获取该管理器管理的对象
	get(id: string): IdOjects | undefined {
		return this.entries[id];
	}

	addEntry(obj: IdOjects): RoomObject[] {
		Memory.Managers[this.name].entries[obj.id] = obj;
		return this.entries;
	}

	addEntries(objs: IdOjects[]) {
		if (_.isArray(objs)) {
			_.each(objs, obj => (this.entries[obj.id] = obj));
		}
	}

	// protected set memory(value: any) {
	// 	Memory.manager[this.name] = value;
	// }

	// protected getValue(manager: string, path: string) {
	// 	return _.get(Memory.manager, [manager, path]);
	// }

	// protected setValue(manager: string, path: string, value: any): void {
	// 	_.set(Memory.manager, [manager, path], value);
	// }

	protected recordUpdateTime() {
		// TODO: 添加其他运行信息
		this.memory.time = Game.time;
	}
}
