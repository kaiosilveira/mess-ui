import { calculateDiagonalMove } from '$lib/movement/diagonal/calculator';
import { BOARD_BOUNDARY, type Position } from '$lib/pieces';
import { MovementDirection } from '../..';

export class DiagonalMovementPattern {
	getDistancesFromBoundary(from: Position): Record<MovementDirection, number> {
		return {
			[MovementDirection.DOWN_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, from.y),
			[MovementDirection.UP_LEFT]: Math.min(from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.DOWN_LEFT]: Math.min(from.x, from.y),
			[MovementDirection.UP_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, BOARD_BOUNDARY - from.y)
		};
	}

	computeAllPossibleMovesFrom(fromPosition: Position): Position[] {
		return [
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.UP_RIGHT, fromPosition),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.DOWN_RIGHT, fromPosition),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.UP_LEFT, fromPosition),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.DOWN_LEFT, fromPosition)
		];
	}

	computeAllPossibleDiagonalMovesTowards(
		direction: MovementDirection,
		fromPosition: Position
	): Position[] {
		const units = this.getDistancesFromBoundary(fromPosition)[direction];
		if (units === 0) return [];

		return Array.from({ length: units }, (_, i) =>
			calculateDiagonalMove({ from: fromPosition, units: i + 1, towards: direction })
		);
	}
}
