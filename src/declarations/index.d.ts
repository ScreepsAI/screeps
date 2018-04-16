/**
 * 基本类,全局对象
 * ====================================================================================================
 * 日志打印对象
 */
declare const Log: {
	success(...content: any[]): void;

	info(...content: any[]): void;

	error(...content: any[]): void;

	warn(...content: any[]): void;

	debug(...content: any[]): void;

	module(title: string, ...content: any[]): void;

	room(room: Room, ...content: any[]): void;

	stringify(content: any): void;
};

declare function Dye(style: string | number, ...text: any[]): string;

declare const getObjByIds: Function;
declare const toIds: Function;
declare const caches: any;
declare const WHITELIST: string[];
declare const ME: string;
declare const CONTROLLER_SIGN_MESSAGE: string;
declare const LOG_LEVEL: string;
declare const LOG_EMOJI: boolean;
declare const hasRoot: boolean;

type IdObject = Creep | Structure | Source | ConstructionSite;

/**
 * 合同对象
 * ==========
 */
declare class Post {
	id: number;
	/**
	 * 合同类型/名称
	 */
	postType: string;
	/**
	 * 合同执行者，可以是多个一起签署
	 */
	poster: string | string[] | any | any[];
	/**
	 * 合同执行目标，可以有多个目标对象
	 */
	target: string | string[] | any | any[];
	/**
	 * 签署合同需要的部件配置
	 */
	bodyNeed: BodyPartConstant | BodyPartConstant[];
	/**
	 * 合同额外的配置
	 */
	options: object;
}

/**
 * 大时钟
 */
declare const Clocks: {
	list: string[];
	getClock(name: string): Clock;
	addClock(clock: Clock): void;
	tick(): void;
}

/**
 * 时钟
 */
declare class Clock {
	constructor(name: string, initParams: object, func: Function, tick: number, autoRun: boolean);

	name: string;
	initParams: object;
	func: Function;
	T: number;
	autoRun: boolean;

	run(): void;

	start(): void;

	pause(): void;

	destory(): void;

	restart(): void;
}
