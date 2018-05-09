interface CreepMemory {
	roomName: string,
	homeRoom: string,
	creepType: string,
	ttl: number,
	spawned: boolean,
	renewTicks?: number,
	renewCheck?: boolean
	flagName?: string
	actionName?: string,
	targetId?: string,
}
