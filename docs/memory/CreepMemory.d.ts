interface CreepMemory {
	[type: string]: any,

	name: string,
	roomName: string,
	homeRoom: string,
	behaviour: string,
	ttl: number,
	carry: StoreDefinition
	spawned: boolean,
	renewTicks?: number,
	renewCheck?: boolean
	flagName?: string
	lastFlagName?: string,
	actionName?: string,
	state?: number,
	lastActionName?: string,
	targetId?: string,
	lastTargetId?: string,
}
