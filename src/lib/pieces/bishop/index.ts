import { MovementDirection, MovementUnitsPolicy } from '$lib/movement';
import { DiagonalMovementPattern } from '$lib/movement/diagonal/pattern';
import { AbstractChessPiece, type Position } from '..';

export class Bishop extends AbstractChessPiece {
	private readonly diagonalMover: DiagonalMovementPattern;
	constructor(deps: { position: Position }) {
		super(deps);

		this.diagonalMover = new DiagonalMovementPattern({
			distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
			allowedDirections: [
				MovementDirection.UP_LEFT,
				MovementDirection.UP_RIGHT,
				MovementDirection.DOWN_LEFT,
				MovementDirection.DOWN_RIGHT
			]
		});
	}

	calculatePossibleMoves({ obstacles }: { obstacles: Position[] }): Position[] {
		return this.diagonalMover.computeAllPossibleMovesFrom(this.position, obstacles);
	}
}
