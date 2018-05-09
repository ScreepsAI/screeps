interface RoomObject {
	targetOf: { [creepName: string]: CreepMemory }
	accessibleFields: RoomPosition[]
}