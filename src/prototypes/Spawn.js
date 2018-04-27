/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description:
 */

StructureSpawn.existCheckKeyArray = ['id'];
class SpawnExtend extends StructureSpawn {
	get raw() {
		//
		const { UUID, id } = this;
		return { UUID, id };
	}
}
Object.defineProperties(
	StructureSpawn.prototype,
	Object.getOwnPropertyDescriptors(SpawnExtend.prototype),
);
