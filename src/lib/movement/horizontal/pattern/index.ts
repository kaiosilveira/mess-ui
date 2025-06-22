import { AbstractMovementPattern } from '$lib/movement/base/pattern';
import { type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';
import { calculateHorizontalMove } from '../calculator';

export class HorizontalMovementPattern extends AbstractMovementPattern {
	private readonly distancePolicy: MovementUnitsPolicy;

	constructor(deps: { distancePolicy: MovementUnitsPolicy }) {
		super();
		this.distancePolicy = deps.distancePolicy;
	}

	computeAllPossibleMovesFrom(fromPosition: Position): Position[] {
		return [
			...this.computeAllPossibleMovesTowards(MovementDirection.RIGHT, fromPosition),
			...this.computeAllPossibleMovesTowards(MovementDirection.LEFT, fromPosition)
		];
	}

	private computeAllPossibleMovesTowards(
		direction: MovementDirection,
		fromPosition: Position
	): Position[] {
		let units: number;

		if (this.distancePolicy === MovementUnitsPolicy.ONE) units = 1;
		else if (this.distancePolicy === MovementUnitsPolicy.TWO) units = 2;
		else if (this.distancePolicy === MovementUnitsPolicy.UP_TO_BOUNDARY) {
			units = this.getDistancesFromBoundary(fromPosition)[direction];
		} else throw new Error(`Unsupported distance policy: ${this.distancePolicy}`);

		if (units === 0) return [];

		return Array.from({ length: units }, (_, i) =>
			calculateHorizontalMove({ from: fromPosition, units: i + 1, towards: direction })
		);
	}
}
