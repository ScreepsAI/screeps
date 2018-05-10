interface CreepMemory {
	[type: string]: any,

	name: string,
	roomName: string,
	homeRoom: string,
	behaviour: string,
	ttl: number,
	spawned: boolean,
	renewTicks?: number,
	renewCheck?: boolean
	flagName?: string
	actionName?: string,
	targetId?: string,
}
