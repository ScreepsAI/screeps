class FlagExtend extends Flag {
	get print(): string {
		return Util.makeFlagUrl(this.name);
	}
}

export const install = () => Util.define(Flag, FlagExtend);
