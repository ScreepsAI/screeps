export enum RoleType {
	// worker
	worker = 'worker',
	remoteWorker = 'worker',
	// miner
	miner = 'miner',
	remoteMiner = 'miner',
	// hauler
	hauler = 'hauler',
	remoteHauler = 'hauler',
	// soldier
	defender = 'soldier',
	melee = 'soldier',
	ranger = 'soldier',
	healer = 'soldier',
	// claimer
	reserver = 'claimer',
	claimer = 'claimer',
	// upgrader
	upgrader = 'upgrader',
}
export const BodyPartCost = {
	move: 50,
	work: 100,
	carry: 50,
	attack: 80,
	ranged_attack: 150,
	heal: 250,
	claim: 600,
	tough: 10,
};
