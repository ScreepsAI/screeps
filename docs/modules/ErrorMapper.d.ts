declare const ErrorMapper: ErrorMapper

interface ErrorMapper {
	handleError(e: Error): void

	wrapLoop(loop: Function): Function
}