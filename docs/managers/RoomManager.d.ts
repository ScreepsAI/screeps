declare const RoomManager: RoomManager

interface RoomManager extends Manager {
	events: RoomEvent
	rooms: { [roomName: string]: Room }
	memory: { [roomName: string]: RoomMemory }
	needFreshMemory: boolean;
}

// ////////////////////////////////////////////////////////////////////
// RoomEvent
// ////////////////////////////////////////////////////////////////////

interface RoomEvent {
	sitesChange: GameEvent,
	structuresChanged: GameEvent,
}

// ////////////////////////////////////////////////////////////////////
// RoomModule
// ////////////////////////////////////////////////////////////////////

interface RoomModule extends Module {
	checkPer(room: Room): boolean

	freshPer(room: Room): void

	registerPer(room: Room): void

	analyzePer(room: Room): void

	runPer(room: Room): void

	cleanupPer(room: Room): void
}