import { Manager } from '../';

export abstract class CreepSetup extends Manager {
	manager: CreepManager;

	protected constructor(namespace: string, manager: CreepManager) {
		super(namespace);
		this.manager = manager;
	}

	// ////////////////////////////////////////////////////////////////////
	// Manager
	// ////////////////////////////////////////////////////////////////////

	fresh() {
		this.state = {};
	}

	checkPerRoom(room: Room): boolean {
		return room.my && room.RCL >= this.minControllerLevel && room.freeSpawns.length > 0;
	}

	analyzePerRoom(room: Room): void {
		this.state[room.name] = {};
		const setup = _.clone(this.RCL[room.RCL]) as RclSetup;
		// maxCount
		if (_.isFunction(setup.maxCount)) setup.maxCount = setup.maxCount(room);
		if (setup.maxCount === 0) return;
		// fixedBody
		if (_.isUndefined(setup.fixedBody)) setup.fixedBody = [];
		// maxMulti
		if (_.isUndefined(setup.maxMulti)) {
			setup.maxMulti = this.maxMulti(room, setup);
		}
		// other
		_.forEach(setup, (prop: any, key: string) => {
			setup[key] = _.isFunction(prop) ? prop(room, setup) : prop;
		});
		// body
		const fixed = this.bodyFormat(setup.fixedBody);
		const multi = _.flatten(_.fill(Array(setup.maxMulti), this.bodyFormat(setup.multiBody)));
		const body = this.bodySort(fixed.concat(multi));
		this.state[room.name] = {
			body: body,
			maxCount: setup.maxCount,
			minEnergyAvailable: _.min([room.energyCapacityAvailable, this.bodyCost(body)]),
		};
	}

	// ////////////////////////////////////////////////////////////////////
	// Setup
	// ////////////////////////////////////////////////////////////////////

	minControllerLevel = 1;

	partPriority = [TOUGH, CARRY, MOVE, WORK, CLAIM, ATTACK, RANGED_ATTACK, HEAL];

	none = {
		multiBody: [],
		fixedBody: [],
		maxMulti: 1,
		minEnergyAvailable: 300,
		maxCount: 0,
	};

	RCL: RCL = {
		1: this.none,
		2: this.none,
		3: this.none,
		4: this.none,
		5: this.none,
		6: this.none,
		7: this.none,
		8: this.none,
	};

	maxMulti(room: Room, setup: RclSetup): number {
		const { multiBody, fixedBody } = setup;
		const onEnergy = (room.energyCapacityAvailable - this.bodyCost(fixedBody)) / this.bodyCost(multiBody);
		const onSize = (50 - this.bodySize(fixedBody)) / this.bodySize(multiBody);
		return Math.floor(_.min([onEnergy, onSize]));
	}

	minMulti(room: Room, setup: RclSetup): number {
		const { multiBody, fixedBody, maxMulti } = setup;
		if (maxMulti === 0) return 0;
		let energy = room.energyAvailable - this.bodyCost(fixedBody);
		if (energy <= 0) return 0;
		const multiCost = this.bodyCost(multiBody);
		for (let minMulti = 0; minMulti <= maxMulti; minMulti++) {
			energy -= multiCost;
			if (energy <= 0) return minMulti;
		}
		return maxMulti;
	}

	// ////////////////////////////////////////////////////////////////////
	// Util
	// ////////////////////////////////////////////////////////////////////

	bodySize(body: BodyConstant): number {
		return _.isArray(body) ? body.length : _.sum(_.values(body));
	}

	bodyCost(body: BodyConstant): number {
		let costs = 0;
		if (!_.isArray(body)) body = this.bodyFormat(body);
		_.forEach(body, part => (costs += BODYPART_COST[part]));
		return costs;
	}

	bodyFormat(body: BodyConstant): BodyPartConstant[] {
		let formatBody: BodyPartConstant[] = [];
		if (!_.isArray(body)) {
			_.forEach(body, (count: number, part: BodyPartConstant) => formatBody.push(..._.fill(Array(count), part)));
		} else {
			formatBody = <BodyPartConstant[]>body;
		}
		return formatBody;
	}

	bodySort(body: BodyPartConstant[]): BodyPartConstant[] {
		const priority = {};
		_.forEach(this.partPriority, (p, i: number) => (priority[p] = i));
		return body.sort((a, b) => priority[a] - priority[b]);
	}
}
