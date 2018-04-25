import { Clock } from '../Clock';

export class CounterClock extends Clock {
	constructor({ name, active }) {
		super({
			type: 'CounterClock',
			name: name,
			initParams: { counter: 1 },
			func: function(params) {
				if (params.counter % 10 === 0) params.counter = 0;
				params.counter += 1;
				Log.info(params.counter);
			},
			tick: 1,
			active: active,
		});
	}
}
