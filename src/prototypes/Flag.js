/**
 * Author: Ruo
 * Create: 2018-04-27
 * Description:
 */
Flag.existCheckKeyArray = ['name'];
class FlagExtend extends Flag {
	get raw() {
		const { UUID, name } = this;
		return { UUID, name };
	}
}

Object.defineProperties(Flag.prototype, Object.getOwnPropertyDescriptors(FlagExtend.prototype));
