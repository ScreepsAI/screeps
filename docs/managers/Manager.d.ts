interface Manager {
	namespace: string

	fresh(): void

	register(): void

	analyze(): void

	run(): void

	cleanup(): void
}
