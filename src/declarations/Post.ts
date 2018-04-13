type Post = {
	id: number;
	postType: string;
	poster: string | string[] | any | any[];
	target: string | string[] | any | any[];
	bodyNeed: BodyPartConstant | BodyPartConstant[];
	options: object;
};
