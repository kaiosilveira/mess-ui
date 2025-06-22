import { MovementDirection } from '$lib/movement';
import { calculateDiagonalMove } from '$lib/movement/diagonally';
import { AbstractChessPiece } from '..';

export class Bishop extends AbstractChessPiece {
	constructor(deps: { position: [number, number] }) {
		super(deps);
	}

	get possibleMoves(): [number, number][] {
		return [
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.UP_RIGHT),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.DOWN_RIGHT),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.UP_LEFT),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.DOWN_LEFT)
		];
	}

	private computeAllPossibleDiagonalMovesTowards(direction: MovementDirection): [number, number][] {
		const units = this.distancesFromBoundary[direction];
		if (units === 0) return [];

		return Array.from({ length: units }, (_, i) =>
			calculateDiagonalMove({ piece: this, units: i + 1, towards: direction })
		);
	}
}
