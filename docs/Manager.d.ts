interface Manager {
	fresh(): void

	register(): void

	analyze(): void

	run(): void

	cleanup(): void
}

declare const RoomManager: RoomManager

interface RoomManager extends Manager {
	rooms: { [roomName: string]: Room }
	memory: { [roomName: string]: RoomMemory }
	events: {
		onSitesChange: GameEvent,
		onStructuresChanged: GameEvent,
	}
	needFreshMemory: boolean;
}

declare const CreepManager: CreepManager

interface CreepManager extends Manager {

}

declare const FlagManager: FlagManager

interface FlagManager extends Manager {

}