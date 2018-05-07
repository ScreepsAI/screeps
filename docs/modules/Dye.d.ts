declare const Dye: Dye

interface Dye {
	color: {
		red: '#F92672',
		purple: '#AE81FF',
		blue: '#66D9EF',
		cyan: '#529B2F',
		green: '#A6E22E',
		yellow: '#E6DB74',
		orange: '#FD971F',
		brown: '#75715E',
		grey: '#999999',
		white: '#F8F8F0',
		black: '#000000',
	}

	css(style: object): string

	run(style: string | number, ...text: any[]): string

	red(...text: any[]): string,

	purple(...text: any[]): string,

	blue(...text: any[]): string,

	cyan(...text: any[]): string,

	green(...text: any[]): string,

	yellow(...text: any[]): string,

	orange(...text: any[]): string,

	brown(...text: any[]): string,

	grey(...text: any[]): string,

	white(...text: any[]): string,

	black(...text: any[]): string,

	link(...text: any[]): string,

	system(...text: any[]): string,

	success(...text: any[]): string,

	error(...text: any[]): string,

	warn(...text: any[]): string,

	info(...text: any[]): string,

	debug(...text: any[]): string,
}