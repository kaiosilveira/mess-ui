export enum MovementDirection {
	UP_RIGHT = 'UP_RIGHT',
	DOWN_RIGHT = 'DOWN_RIGHT',
	UP_LEFT = 'UP_LEFT',
	DOWN_LEFT = 'DOWN_LEFT',
	RIGHT = 'RIGHT',
	LEFT = 'LEFT',
}

export enum MovementUnitsPolicy {
	ONE = 'one',
	UP_TO_BOUNDARY = 'up_to_boundary'
}

export interface DeltaVector {
	x: number;
	y: number;
}
