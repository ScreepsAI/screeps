import { ErrorMapper } from './utils/ErrorMapper';
import Reboot from './reboot';
// Main Loop
// ==========================================================================
const Loop = (): void => {
	console.log(global.Clocks);
	global.Clocks.tick();
};

// 解析 SourceMap , 统一错误处理
// ==========================================================================
export default ErrorMapper.wrapLoop((): void => {
	if (!Memory.hasRoot || !global.hasRoot) Reboot();
	Loop();
});
