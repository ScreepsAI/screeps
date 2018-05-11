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
	lastFlagName?: string,
	actionName?: string,
	state?: string,
	lastActionName?: string,
	targetId?: string,
	lastTargetId?: string,
}
