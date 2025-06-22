import { AbstractMovementPattern } from '$lib/movement/base/pattern';
import { type Position } from '$lib/pieces';
import { MovementDirection } from '../..';
import { calculateLShapedMove } from '../calculator';

export class LShapedMovementPattern extends AbstractMovementPattern {
	constructor() {
		super();
	}

	computeAllPossibleMovesFrom(fromPosition: Position): Position[] {
		return [
			...this.computeAllPossibleMovesTowards(MovementDirection.L_SHAPED_DOWN_LEFT, fromPosition),
			...this.computeAllPossibleMovesTowards(MovementDirection.L_SHAPED_DOWN_RIGHT, fromPosition),
			...this.computeAllPossibleMovesTowards(MovementDirection.L_SHAPED_UP_LEFT, fromPosition),
			...this.computeAllPossibleMovesTowards(MovementDirection.L_SHAPED_UP_RIGHT, fromPosition)
		];
	}

	private computeAllPossibleMovesTowards(
		direction: MovementDirection,
		fromPosition: Position
	): Position[] {
		return [calculateLShapedMove({ from: fromPosition, towards: direction })];
	}
}
