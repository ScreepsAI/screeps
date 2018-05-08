export class Log {
	public raw = {
		success(...content: any[]): string {
			return [Util.emoji.tick, Dye.green(...content)].join(' ');
		},
		error(...content: any[]): string {
			return [Util.emoji.cross, Dye.red(...content)].join(' ');
		},
		warn(...content: any[]): string {
			return [Util.emoji.warn, Dye.orange(...content)].join(' ');
		},
		info(...content: any[]): string {
			return [Util.emoji.info, Dye.blue(...content)].join(' ');
		},
		debug(...content: any[]): string {
			return [Util.emoji.debug, ...content].join(' ');
		},
	};

	public success(...content: any[]): void {
		console.log(this.raw.success(content));
	}

	public error(...content: any[]): void {
		if (LOG_LEVEL < 2) return;
		console.log(this.raw.error(content));
	}

	public warn(...content: any[]): void {
		if (LOG_LEVEL < 3) return;
		console.log(this.raw.warn(content));
	}

	public info(...content: any[]): void {
		if (LOG_LEVEL < 4) return;
		console.log(this.raw.info(content));
	}

	public debug(...content: any[]): void {
		if (LOG_LEVEL < 5) return;
		console.log(this.raw.debug(content));
	}

	public module(title: string, ...content: any[]): void {
		console.log(Util.emoji.module, Dye.link(title), ...content);
	}

	public room(room: Room | string, ...content: any[]): void {
		const roomUrl = _.isString(room) ? Util.link(<string>room) : (<Room>room).print;
		this.module(Util.emoji.home, roomUrl, content);
	}

	public flag(flag: Flag | string, ...content: any[]): void {
		const flagUrl = _.isString(flag) ? Game.flags[flag].print : (<Flag>flag).print;
		this.module(Util.emoji.flag, flagUrl, content);
	}

	public stringify(content: any): void {
		console.log(JSON.stringify(content, null, 2));
	}

	public table(obj: object): void {
		console.log(Util.jsonToTable(obj));
	}
}
