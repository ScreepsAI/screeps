interface CreepMemory {
	name?: string;
	posts?: any;
	// role: number;
	// homeRoom: string;
	// hasBorn?: boolean;
	// target?: string | null;
	// targetType?: number | null;
	// action?: string;
}

interface Creep {
	posts: any;
	isHurt: boolean;

	getBodyparts(partTypes: BodyPartConstant): number;

	hasBodyparts(partTypes: BodyPartConstant | BodyPartConstant[], start?: number): boolean;

	hasActiveBodyparts(partTypes: BodyPartConstant | BodyPartConstant[]): boolean;
}
