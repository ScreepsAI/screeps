declare namespace NodeJS {
	interface Global {
		[type: string]: any;

		isDev: boolean;
		isRoot: boolean;
		ErrorMapper: ErrorMapper;
	}
}

// ////////////////////////////////////////////////////////////////////
// Constants
// ////////////////////////////////////////////////////////////////////

declare const ENV: string;
declare const isDev: boolean;
declare const BUILD_VERSION: string;
declare const BUILD_TIME: string;

declare const ME: string
declare const MEMORY_RESYNC_INTERVAL: number
declare const MAX_REPAIR_LIMIT: RclNumber[]
declare const CONSTRUCTION_PRIORITY: string[]
// ////////////////////////////////////////////////////////////////////
// Config
// ////////////////////////////////////////////////////////////////////

declare const CONTROLLER_SIGN_MESSAGE: string
declare const LOG_LEVEL: number
declare const WHITELIST: string[]

// ////////////////////////////////////////////////////////////////////
// Other
// ////////////////////////////////////////////////////////////////////

interface RclNumber {
	1: number,
	2: number,
	3: number,
	4: number,
	5: number,
	6: number,
	7: number,
	9: number
}