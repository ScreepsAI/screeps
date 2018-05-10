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

	freshPer(room: Room): void

	registerPer(room: Room): void

	analyzePer(room: Room): void

	runPer(room: Room): void

	cleanupPer(room: Room): void
}