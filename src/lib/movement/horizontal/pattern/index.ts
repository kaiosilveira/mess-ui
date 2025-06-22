import { BOARD_BOUNDARY, type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';
import { calculateHorizontalMove } from '../calculator';

export class HorizontalMovementPattern {
	private readonly distancePolicy: MovementUnitsPolicy;

	constructor(deps: { distancePolicy: MovementUnitsPolicy }) {
		this.distancePolicy = deps.distancePolicy;
	}

	getDistancesFromBoundary(from: Position): Record<MovementDirection, number> {
		return {
			[MovementDirection.DOWN_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, from.y),
			[MovementDirection.UP_LEFT]: Math.min(from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.DOWN_LEFT]: Math.min(from.x, from.y),
			[MovementDirection.UP_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.RIGHT]: BOARD_BOUNDARY - from.x,
			[MovementDirection.LEFT]: from.x
		};
	}

	computeAllPossibleMovesFrom(fromPosition: Position): Position[] {
		return [
			...this.computeAllPossibleHorizontalMovesTowards(MovementDirection.RIGHT, fromPosition),
			...this.computeAllPossibleHorizontalMovesTowards(MovementDirection.LEFT, fromPosition)
		];
	}

	computeAllPossibleHorizontalMovesTowards(
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
