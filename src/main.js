import { ErrorMapper } from './utils/ErrorMapper';
import { reboot } from './reboot';
import _ from 'lodash';

exports.loop = ErrorMapper.wrapLoop(() => {
	try {
		if (!global['hasRoot']) reboot();
		_.forEach(RoomManager.entries, room => {
			Policy.oversee(room);
			Policy.do(room);
		});
	} catch (e) {
		if (e instanceof Error) throw e;
		else throw new Error(e);
	}
});
