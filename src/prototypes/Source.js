class SourceExtend extends Source {
	/**
	 *  返回资源是否已空的状态
	 */
	get empty() {
		return this.energy === 0;
	}
	/**
	 * 返回资源能量是否已满的状态
	 */
	get full() {
		return this.energy === this.energyCapacity;
	}
	/**
	 * 返回资源周围8格内walkable的坐标数组
	 */
	get accessibleFields() {
		const memory = SourceManager.getEntryFromMemory(this.id);
		if (memory && !memory.accessibleFields)
			memory.accessibleFields = this.pos.getAccessibleFields();

		return memory.accessibleFields;
	}
	/**
	 * 返回资源可签订的最大合同数量
	 */
	get maxPosts() {
		const memory = SourceManager.getEntryFromMemory(this.id);
		if (memory && !memory.maxPosts) memory.maxPosts = this.accessibleFields.length;

		return memory.maxPosts;
	}
	/**
	 * 返回和资源有关的合同数组
	 */
	get posts() {
		return PostManager.getPostByIdOrNameFromMemory(this.id);
	}
}
Object.defineProperties(Source.prototype, Object.getOwnPropertyDescriptors(SourceExtend.prototype));
