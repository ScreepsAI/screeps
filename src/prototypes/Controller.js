/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
import _ from 'lodash';

StructureController.existCheckKeyArray = ['id'];
StructureController.className = 'StructureController';
StructureController.prototype.className = 'StructureController';
StructureController.prototype.currentWorkers = [];
class StructureControllerExtend extends StructureController {
	get raw() {
		return _.pick(this, this.paramsList);
	}
	get paramsList() {
		return ['UUID', 'id', 'currentWorkers'];
	}
	get accessibleWorkers() {
		if (this._accessibleWorkers === undefined) {
			this._accessibleWorkers = this.pos.getAccessibleFields();
		}
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
		ControllerManager.modify(this, this.raw);
	}

	removeWorker(UUID) {
		const index = this.currentWorkers.indexOf(UUID);
		if (index < 0) return;
		else {
			this.currentWorkers.splice(index, 1);
			ControllerManager.modify(this, this.raw);
		}
	}
	clearWorkers() {
		this.currentWorkers = [];
		ControllerManager.modify(this, this.raw);
	}
}
Object.defineProperties(
	StructureController.prototype,
	Object.getOwnPropertyDescriptors(StructureControllerExtend.prototype),
);
