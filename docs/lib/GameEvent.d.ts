interface GameEvent {
	trigger(): boolean

	on(fun: Function): void

	fresh(): void

	handle(e?: any): void
}