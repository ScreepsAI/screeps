declare const Log: Log

interface Log {
	raw: {
		success(...content: any[]): string;
		error(...content: any[]): string;
		warn(...content: any[]): string;
		info(...content: any[]): string;
		debug(...content: any[]): string;
	};
	success(...content: any[]): void;
	error(...content: any[]): void;
	warn(...content: any[]): void;
	info(...content: any[]): void;
	debug(...content: any[]): void;
	module(title: string, ...content: any[]): void;
	room(room: Room | string, ...content: any[]): void;
	flag(flag: Flag | string, ...content: any[]): void;
	stringify(content: any): void;
	table(obj: object): void;
}