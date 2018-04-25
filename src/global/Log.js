import { Emoji } from '../utils/Emoji';

const LogLevel = {
	alert: 1,
	error: 2,
	warn: 3,
	info: 4,
	debug: 5,
};
export const Log = {
	success(...content) {
		const title = LOG_EMOJI ? Emoji.tick : '[SUCCESS]';
		console.log(Dye('success', title), Dye(COLOR_GREEN, ...content));
	},
	error(...content) {
		if (LogLevel[LOG_LEVEL] < 2) return;
		const title = LOG_EMOJI ? Emoji.cross : '[ERROR]';
		console.log(Dye('error', title), Dye(COLOR_RED, ...content));
	},
	warn(...content) {
		if (LogLevel[LOG_LEVEL] < 3) return;
		const title = LOG_EMOJI ? Emoji.warn : '[WARN]';
		console.log(Dye('warn', title), Dye(COLOR_ORANGE, ...content));
	},
	info(...content) {
		if (LogLevel[LOG_LEVEL] < 4) return;
		const title = LOG_EMOJI ? Emoji.info : '[INFO]';
		console.log(Dye('info', title), Dye(COLOR_BLUE, ...content));
	},
	debug(...content) {
		if (LogLevel[LOG_LEVEL] < 5) return;
		const title = LOG_EMOJI ? Emoji.debug : '[DEBUG]';
		console.log(Dye('debug', title), ...content);
	},
	module(title, ...content) {
		console.log(Dye('system', `[${title}]`), ...content);
	},
	room(room, ...content) {
		const title = LOG_EMOJI ? `${Emoji.home} ${room.print}` : `[${room.print}]`;
		console.log(Dye('room', title), ...content);
	},
	stringify(content) {
		console.log('----------------------------------------------');
		console.log(JSON.stringify(content, null, 2));
		console.log('----------------------------------------------');
	},
};
