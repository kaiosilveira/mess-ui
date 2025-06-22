import { MovementDirection, MovementUnitsPolicy } from '$lib/movement';
import { DiagonalMovementPattern } from '$lib/movement/diagonal/pattern';
import { VerticalMovementPattern } from '$lib/movement/vertical/pattern';
import { AbstractChessPiece, type Position } from '..';

export class Pawn extends AbstractChessPiece {
	private diagonalMover: DiagonalMovementPattern;
	private verticalMover: VerticalMovementPattern;

	constructor(deps: { position: Position }) {
		super(deps);

		this.diagonalMover = new DiagonalMovementPattern({
			allowedDirections: [MovementDirection.UP_LEFT, MovementDirection.UP_RIGHT],
			distancePolicy: MovementUnitsPolicy.ONE
		});

		this.verticalMover = new VerticalMovementPattern({
			distancePolicy: MovementUnitsPolicy.TWO,
			allowedDirections: [MovementDirection.UP]
		});
	}

	calculatePossibleMoves(): Position[] {
		return [
			...this.diagonalMover.computeAllPossibleMovesFrom(this.position),
			...this.verticalMover.computeAllPossibleMovesFrom(this.position)
		];
	}
}
