export enum MovementDirection {
	UP_RIGHT = 'UP_RIGHT',
	DOWN_RIGHT = 'DOWN_RIGHT',
	UP_LEFT = 'UP_LEFT',
	DOWN_LEFT = 'DOWN_LEFT',
	RIGHT = 'RIGHT',
	LEFT = 'LEFT',
	DOWN = 'DOWN',
	UP = 'UP',
	L_SHAPED_UP_LEFT = 'L_SHAPED_UP_LEFT',
	L_SHAPED_UP_RIGHT = 'L_SHAPED_UP_RIGHT',
	L_SHAPED_DOWN_LEFT = 'L_SHAPED_DOWN_LEFT',
	L_SHAPED_DOWN_RIGHT = 'L_SHAPED_DOWN_RIGHT',
	L_SHAPED_LEFT_UP = 'L_SHAPED_LEFT_UP',
	L_SHAPED_LEFT_DOWN = 'L_SHAPED_LEFT_DOWN',
	L_SHAPED_RIGHT_UP = 'L_SHAPED_RIGHT_UP',
	L_SHAPED_RIGHT_DOWN = 'L_SHAPED_RIGHT_DOWN'	
}

export enum MovementUnitsPolicy {
	ONE = 'one',
	TWO = 'two',
	UP_TO_BOUNDARY = 'up_to_boundary'
}

export interface DeltaVector {
	x: number;
	y: number;
}
