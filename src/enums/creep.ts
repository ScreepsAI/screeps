export enum RoleType {
	// worker
	worker = 1,
	remoteWorker = 2,
	// miner
	miner = 10,
	remoteMiner = 11,
	// hauler
	hauler = 20,
	remoteHauler = 21,
	// claimer
	reserver = 30,
	claimer = 31,
	// upgrader
	upgrader = 40,
	// soldier
	defender = 100,
	melee = 101,
	ranger = 102,
	healer = 103,
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
