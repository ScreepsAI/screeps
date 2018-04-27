import { ErrorMapper } from './utils/ErrorMapper';
import { reboot } from './reboot';
exports.loop = ErrorMapper.wrapLoop(() => {
	try {
		if (!global['hasRoot']) reboot();
	} catch (e) {
		if (e instanceof Error) throw e;
		else throw new Error(e);
	}
});
