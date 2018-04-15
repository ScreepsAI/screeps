Object.defineProperties(Source.prototype, {
	active: {
		get(): boolean {
			return this.energy > 0;
		},
	},
	accessibleFields: {
		get: function() {
			const memory = SourceManager.getEntryFromMemory(this.id);
			if (memory && !memory.accessibleFields) memory.accessibleFields = this.pos.getAccessibleFields();

			return memory.accessibleFields;
		}
	},
	maxPosts: {
		get: function() {
			const memory = SourceManager.getEntryFromMemory(this.id);
			if (memory && !memory.maxPosts) memory.maxPosts = this.accessibleFields.length;

			return memory.maxPosts;
		}
	},
	posts: {
		get: function() {
			return PostManager.getByTarget(this.id);
		}
	}
	// memory: {
	// 	get(): any {
	// 		this._checkMemory();
	// 		return Memory.sources[this.id];
	// 	},
	// 	set(value: any): void {
	// 		this._checkMemory();
	// 		Memory.sources[this.id] = value;
	// 	},
	// },
	// container: {
	// 	get(): StructureContainer | null {
	// 		if (!_.isUndefined(this.memory.container)) {
	// 			const cacheContainer: StructureContainer | null = Game.getObjectById(this.memory.container);
	// 			if (cacheContainer !== null) return cacheContainer;
	// 			delete this.memory.container;
	// 		}
	// 		// 重新寻找
	// 		let container: any;
	// 		_.forEach(this.pos.getAdjacentPos(1), (pos: RoomPosition) => {
	// 			if (!_.isUndefined(container)) return;
	// 			let c = pos.getStructure(STRUCTURE_CONTAINER);
	// 			if (!_.isUndefined(c)) container = c as StructureContainer;
	// 		});
	// 		if (_.isUndefined(container)) return null;
	// 		this.memory.container = container.id;
	// 		return container;
	// 	},
	// },
	// hasContainer: {
	// 	get(): boolean {
	// 		return this.container !== null;
	// 	},
	// },
});

// Source.prototype._checkMemory = function(): void {
// 	if (_.isUndefined(Memory.sources)) Memory.sources = {};
// 	if (_.isUndefined(_.get(Memory.sources, this.id))) _.set(Memory.sources, this.id, {});
// };
