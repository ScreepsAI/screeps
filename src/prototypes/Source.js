import _ from 'lodash';
Source.existCheckKeyArray = ['id'];
Source.className = 'Source';
Source.prototype.className = 'Source';
Source.prototype.currentWorkers = [];
class SourceExtend extends Source {
	get raw() {
		return _.pick(this, this.paramsList);
	}

	get paramsList() {
		return ['UUID', 'id', 'currentWorkers'];
	}

	// 返回资源是否已空的状态
	get isEmpty() {
		return this.energy === 0;
	}

	// 返回资源能量是否已满的状态
	get isFull() {
		return this.energy === this.energyCapacity;
	}

	get accessibleWorkers() {
		if (this._accessibleWorkers === undefined)
			this._accessibleWorkers = this.pos.getAccessibleFields();
		return this._accessibleWorkers;
	}
	set accessibleWorkers(v) {
		this._accessibleWorkers = [];
		_.forEach(v, p => {
			this._accessibleWorkers.push(new RoomPosition(p.x, p.y, p.roomName));
		});
	}

	setWorker(UUID) {
		this.currentWorkers.push(UUID);
		SourceManager.modify(this, this.raw);
	}

	removeWorker(UUID) {
		const index = this.currentWorkers.indexOf(UUID);
		if (index < 0) return;
		else {
			this.currentWorkers.splice(index, 1);
			SourceManager.modify(this, this.raw);
		}
	}

	clearWorkers() {
		this.currentWorkers = [];
		SourceManager.modify(this, this.raw);
	}
}

Object.defineProperties(Source.prototype, Object.getOwnPropertyDescriptors(SourceExtend.prototype));
