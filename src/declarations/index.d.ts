declare namespace NodeJS {
	interface Global {
		[type: string]: any;
		Clocks: Clocks;
		Clock: Clock;
		Log: LogConstructor;
		Dye: Function;
		getObjByIds: Function;
		toIds: Function;
	}
}

type IdObject = Creep | Structure | Source | ConstructionSite;
