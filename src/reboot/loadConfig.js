/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description: 配置页面
 */
// 不要改 config 引用路径（打包时候不会引入）
const config = require('../config') || {}; // 载入顶层配置

export const loadConfig = () => {
	Object.assign(global, config); // 将顶层配置装载到global上
	Memory.config = config;
};
