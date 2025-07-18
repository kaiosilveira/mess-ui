import { MovementDirection } from '$lib/movement';
import { type Position, BOARD_BOUNDARY } from '$lib/pieces';

export abstract class AbstractMovementPattern {
	abstract computeAllPossibleMovesFrom(fromPosition: Position, obstacles: Position[]): Position[];

	getDistancesFromBoundary(from: Position): Record<MovementDirection, number> {
		return {
			[MovementDirection.DOWN_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, from.y),
			[MovementDirection.UP_LEFT]: Math.min(from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.DOWN_LEFT]: Math.min(from.x, from.y),
			[MovementDirection.UP_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.RIGHT]: BOARD_BOUNDARY - from.x,
			[MovementDirection.LEFT]: from.x,
			[MovementDirection.DOWN]: from.y,
			[MovementDirection.UP]: BOARD_BOUNDARY - from.y,
			[MovementDirection.L_SHAPED_DOWN_LEFT]: Math.min(from.x, from.y),
			[MovementDirection.L_SHAPED_DOWN_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, from.y),
			[MovementDirection.L_SHAPED_UP_LEFT]: Math.min(from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.L_SHAPED_LEFT_UP]: Math.min(from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.L_SHAPED_LEFT_DOWN]: Math.min(from.x, from.y),
			[MovementDirection.L_SHAPED_RIGHT_DOWN]: Math.min(BOARD_BOUNDARY - from.x, from.y),
			[MovementDirection.L_SHAPED_UP_RIGHT]: Math.min(
				BOARD_BOUNDARY - from.x,
				BOARD_BOUNDARY - from.y
			),
			[MovementDirection.L_SHAPED_RIGHT_UP]: Math.min(
				BOARD_BOUNDARY - from.x,
				BOARD_BOUNDARY - from.y
			)
		};
	}
}
