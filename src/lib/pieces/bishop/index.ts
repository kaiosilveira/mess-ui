import type { DiagonalMovementPattern } from '$lib/movement/diagonal/pattern';
import { AbstractChessPiece, type Position } from '..';

export class Bishop extends AbstractChessPiece {
	private diagonalMover: DiagonalMovementPattern;

	constructor(deps: { position: Position; diagonalMover: DiagonalMovementPattern }) {
		super(deps);
		this.diagonalMover = deps.diagonalMover;
	}

	get possibleMoves(): Position[] {
		return this.diagonalMover.computeAllPossibleMovesFrom(this.position);
	}
}
