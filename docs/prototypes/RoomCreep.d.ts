interface RoomCreepMemory {

}

interface RoomCreep {
	memory: RoomCreepMemory
	all: Creep[]
	my: Creep[]
	hostiles: Creep[]
}