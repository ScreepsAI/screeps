interface RoomObject {
	targetOf: { [creepName: string]: CreepMemory }
	accessible(radius:number): RoomPosition[]
}