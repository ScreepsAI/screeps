declare namespace NodeJS {
	interface Global {
		[type: string]: any;

		isDev: boolean;
		isRoot: boolean;
		ErrorMapper: ErrorMapper;
	}
}

declare const ENV: string;
declare const isDev: boolean;
declare const BUILD_VERSION: string;
declare const BUILD_TIME: string;

interface Component {
	loop(): void
}
