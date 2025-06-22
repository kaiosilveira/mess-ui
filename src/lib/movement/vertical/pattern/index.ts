import { AbstractMovementPattern } from '$lib/movement/base/pattern';
import { type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';
import { calculateVerticalMove } from '../calculator';

export class VerticalMovementPattern extends AbstractMovementPattern {
	private readonly distancePolicy: MovementUnitsPolicy;
	private readonly allowedDirections: MovementDirection[];

	constructor(deps: {
		distancePolicy: MovementUnitsPolicy;
		allowedDirections: MovementDirection[];
	}) {
		super();
		this.distancePolicy = deps.distancePolicy;
		this.allowedDirections = deps.allowedDirections;
	}

	computeAllPossibleMovesFrom(fromPosition: Position): Position[] {
		return this.allowedDirections.flatMap((direction) =>
			this.computeAllPossibleMovesTowards(direction, fromPosition)
		);
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
			calculateVerticalMove({ from: fromPosition, units: i + 1, towards: direction })
		);
	}
}
