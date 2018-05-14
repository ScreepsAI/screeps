/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description:
 */
import _ from 'lodash';
StructureSpawn.existCheckKeyArray = ['id'];
StructureSpawn.className = 'StructureSpawn';
StructureSpawn.prototype.className = 'StructureSpawn';
StructureSpawn.prototype.orders = [];
class SpawnExtend extends StructureSpawn {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'id', 'orders'];
	}

	get headOrder() {
		return this.orders.shift();
		SpawnManager.modify(this, this.raw);
	}

	// 返回资源是否已空的状态
	get isEmpty() {
		return this.energy === 0;
	}

	// 返回资源能量是否已满的状态
	get isFull() {
		return this.energy === this.energyCapacity;
	}

	addOrder(body, name, opts) {
		console.log(this.orders);
		this.orders.push({ body, name, opts });
		SpawnManager.modify(this, this.raw);
	}

	removeOrder(name) {
		const index = _.findIndex(this.orders, o => o.name === name);
		if (index < 0) return;
		this.orders.splice(index, 1);
		SpawnManager.modify(this, this.raw);
	}

	clearOrder() {
		this.orders = [];
		SpawnManager.modify(this, this.raw);
	}
}

Object.defineProperties(
	StructureSpawn.prototype,
	Object.getOwnPropertyDescriptors(SpawnExtend.prototype),
);
