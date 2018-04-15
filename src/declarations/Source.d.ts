
interface Source {
	/**
	 * 周围8格内非墙体坐标
	 */
	accessibleFields: any[];
	/**
	 * 允许被分配的最大合同数量
	 */
	maxPosts: number;
	/**
	 * 和该Source有关的合同数组
	 */
	posts: Post[]; 
}
