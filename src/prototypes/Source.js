Source.existCheckKeyArray = ['id'];
class SourceExtend extends Source {
	get raw() {
		const { UUID, id } = this;
		return { UUID, id };
	}
	// 返回资源是否已空的状态
	get isEmpty() {
		return this.energy === 0;
	}
	// 返回资源能量是否已满的状态
	get isFull() {
		return this.energy === this.energyCapacity;
	}

	// 返回和资源有关的合同数组
	// get posts() {
	// 	return PostManager.getPostByIdOrNameFromMemory(this.id);
	// }
}
Object.defineProperties(Source.prototype, Object.getOwnPropertyDescriptors(SourceExtend.prototype));
