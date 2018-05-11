interface Creep {
	action: CreepAction | null
	target: Target | null
	flag: Flag | null

	print: string
	hostile: boolean
	sum: number
	lastTarget: Target
	lastFlag: Flag

	assignTarget(target: Target):void
	assignAction(action: CreepAction, target?: Target): boolean
	unAssignAction():void

	assignFlag(flag: Flag): boolean

	getBodypartsCount(partType: BodyPartConstant): number
}