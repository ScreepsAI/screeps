import { ErrorMapper } from './utils/ErrorMapper';
import { reboot, needReboot } from './reboot';

// Main Loop
// ==========================================================================
const Loop = (): void => {
	global.Clocks.tick();
};

// 解析 SourceMap , 统一错误处理
// ==========================================================================
export default ErrorMapper.wrapLoop((): void => {
	if (needReboot) reboot();
	Loop();
});
