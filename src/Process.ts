export class Process {
	static namespace = 'Process';

	public loop(): void {
		this.fresh();
		this.register();
		this.analyze();
		this.run();
		this.cleanup();
	}

	private fresh(): void {
		RoomManager.fresh();
		FlagManager.fresh();
		CreepManager.fresh();
	}

	private register(): void {
		RoomManager.register();
		FlagManager.register();
		CreepManager.register();
	}

	private analyze(): void {
		RoomManager.analyze();
		FlagManager.analyze();
		CreepManager.analyze();
	}

	private run(): void {
		RoomManager.run();
		FlagManager.run();
		CreepManager.run();
	}

	private cleanup(): void {
		RoomManager.cleanup();
		FlagManager.cleanup();
		CreepManager.cleanup();
	}
}
