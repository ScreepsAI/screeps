declare const CreepManager: CreepManager

interface CreepManager extends Manager {
	population: CreepPopulation
	actions: { [name: string]: CreepAction }
	behaviours: { [name: string]: CreepBehaviour }
	setups: { [name: string]: CreepSetup }
	events: CreepEvent

	registerAction(creep: Creep, action: CreepAction, target: Target): void

	registerFlag(creep: Creep, flag: Flag): void
}

interface Target extends RoomObject {
	id: string,
	name: string
}

// ////////////////////////////////////////////////////////////////////
// CreepEvent
// ////////////////////////////////////////////////////////////////////

interface CreepEvent {
	spawningStarted: GameEvent,
	spawningCompleted: GameEvent
	died: GameEvent,
}

// ////////////////////////////////////////////////////////////////////
// CreepPopulation
// ////////////////////////////////////////////////////////////////////

interface CreepPopulation extends Manager {

}

// ////////////////////////////////////////////////////////////////////
// CreepSetup
// ////////////////////////////////////////////////////////////////////

interface CreepSetup extends Manager {
	state: {
		[roomName: string]: {
			body: BodyPartConstant[],
			maxCount: number,
			minEnergyAvailable: number
		}
	}
}

type BodyConstant = BodyPartConstant[] | BodyObject

interface BodyObject {
	[partName: string]: number
}

interface RclSetup {
	multiBody: BodyConstant,
	fixedBody: BodyConstant,
	maxMulti: number,
	maxCount: number,
}

interface RclSetupRaw {
	multiBody: BodyConstant,
	fixedBody?: BodyConstant,
	maxMulti?: number | Function,
	maxCount: number | Function,
}

interface RCL {
	1: RclSetupRaw,
	2: RclSetupRaw,
	3: RclSetupRaw,
	4: RclSetupRaw,
	5: RclSetupRaw,
	6: RclSetupRaw,
	7: RclSetupRaw,
	8: RclSetupRaw,
}

// ////////////////////////////////////////////////////////////////////
// CreepBehaviour
// ////////////////////////////////////////////////////////////////////

interface CreepBehaviour extends Manager {

}

// ////////////////////////////////////////////////////////////////////
// CreepAction
// ////////////////////////////////////////////////////////////////////

interface CreepAction extends Manager {

}