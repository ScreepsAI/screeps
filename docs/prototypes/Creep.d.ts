interface Creep {
	action: CreepAction | null
	target: Target | null
	flag: Flag | null

	print: string
	hostile: boolean
}