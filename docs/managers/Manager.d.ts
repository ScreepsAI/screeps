interface Manager {
	namespace: string

	fresh(): void

	register(): void

	analyze(): void

	run(): void

	cleanup(): void
}

interface Module extends Manager {
	check(): boolean

	checkPer(room: Room): boolean

	freshPer(...arg: any[]): void

	registerPer(...arg: any[]): void

	analyzePer(...arg: any[]): void

	runPer(...arg: any[]): void

	cleanupPer(...arg: any[]): void
}