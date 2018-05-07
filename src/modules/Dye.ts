import { ColorType } from '../enums/color';
export class Dye {
	public color = {
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
	};

	private style = {
		link: { color: '#428bca', fontSize: '9px' },
		system: { color: this.color.grey, fontSize: '9px' },
		success: { color: this.color.green, fontSize: '9px' },
		error: { color: this.color.red, fontSize: '9px' },
		warn: { color: this.color.orange, fontSize: '9px' },
		info: { color: this.color.blue, fontSize: '9px' },
		debug: { color: this.color.brown, fontSize: '9px' },
	};

	constructor() {
		_.assign(this.style, this.color);
		_.forEach(Object.keys(this.style), key => {
			this[key] = (...text: any[]) => this.run(key, ...text);
		});
	}

	public css(style: object): string {
		let css = '';
		const format = (value: string | number, key: string): void => {
			css += `${_.kebabCase(key)}: ${value};`;
		};
		_.forEach(style, format);
		return css;
	}

	public run(style: string | number, ...text: any[]): string {
		if (_.isNumber(style)) style = ColorType[style];
		const applyStyle = this.style[style];
		const msg = text.join(' ');
		if (_.isObject(applyStyle)) {
			return `<span style="${this.css(<object>applyStyle)}">${msg}</span>`;
		} else {
			return `<span style="color: ${applyStyle}">${msg}</span>`;
		}
	}
}
