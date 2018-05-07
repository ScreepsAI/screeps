/**
 * Author: Ruo
 * Create: 2018-05-04
 * Description:
 */

export const checkParams = room => {
	const energyParams = {
		energy: room.energy,
		energyCapacity: room.energyCapacity,
		energyLevel: String(room.energy / room.energyCapacity * 100).toFixed(2),
	};
	const defendParams = {
		hostileCreeps: room.hostileCreeps,
	};
	return Object.assign({}, energyParams, defendParams);
};
