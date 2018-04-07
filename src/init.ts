import { InitManager } from './managers';
export const init = () => {
	if (!Memory.Config || !Memory.Config.init) {
		// 初始化manager
		InitManager();
	}
};
