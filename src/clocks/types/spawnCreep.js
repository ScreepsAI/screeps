import { Clock } from '../Clock';
/**
 * creep出生用时钟，出生后会自动绑定到指定id的post中entry的kind name是creeps
 */
export class SpawnCreepClock extends Clock {
	constructor({ name, initParams, active }) {
		const { needTime, creepName, postId } = initParams;
		super({
			type: 'SpawnCreepClock',
			name,
			initParams: { needTime, creepName, postId },
			func: function(params) {
				if (!params) ClockManager.removeClock(name);
				if (params.needTime === 0) {
					const creep = Game.creeps[params.creepName];
					const post = PostManager.entries[postId];
					console.log(creep, post.id);
					if (creep && post) {
						post.addEntry(creep, 'creeps');
						post.init();
						ClockManager.removeClock(name);
						Log.success(`creep ${name} spawn complete!`);
						return;
					}
				} else params.needTime -= 1;
				Log.info(`Game Time ${Game.time}: Creep ${name} will born in ${params.needTime}`);
			},
			tick: 1,
			active,
		});
	}
}
