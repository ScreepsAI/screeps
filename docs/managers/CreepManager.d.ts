declare const CreepManager: CreepManager

interface CreepManager extends Manager {
	population: CreepPopulation
	actions: {
		harvesting: CreepAction
		upgrading: CreepAction
		feeding: CreepAction
		building: CreepAction
	}
	behaviours: {
		wroker: CreepBehaviour
	}
	setups: {
		wroker: CreepSetup
	}
	events: CreepEvent

	assignAction(creep: Creep, action: CreepAction, target?: Target): boolean

	assignFlag(creep: Creep, flag: Flag): boolean
}

type Target = Creep | Structure | Source | Mineral | RoomObject

interface RoomObject {
	id: string,
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

interface CreepPopulation extends Module {

}

// ////////////////////////////////////////////////////////////////////
// CreepSetup
// ////////////////////////////////////////////////////////////////////

interface CreepSetup extends Module {
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

interface SpawnOrder {
	name: string,
	behaviour: string,
	body: BodyPartConstant[],
	cost: number,
	count: number
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

interface CreepBehaviour extends Module {

}

// ////////////////////////////////////////////////////////////////////
// CreepAction
// ////////////////////////////////////////////////////////////////////

interface CreepAction extends Module {
	runPer(creep: Creep): boolean

	onAssignment(creep: Creep, target: Target): void
}