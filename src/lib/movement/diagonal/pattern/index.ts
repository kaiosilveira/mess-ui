import { AbstractMovementPattern } from '$lib/movement/base/pattern';
import { calculateDiagonalMove } from '$lib/movement/diagonal/calculator';
import { type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';

export class DiagonalMovementPattern extends AbstractMovementPattern {
	private readonly allowedDirections: MovementDirection[];
	private readonly distancePolicy: MovementUnitsPolicy;

	constructor(deps: {
		allowedDirections: MovementDirection[];
		distancePolicy: MovementUnitsPolicy;
	}) {
		super();
		this.allowedDirections = deps.allowedDirections;
		this.distancePolicy = deps.distancePolicy;
	}

	computeAllPossibleMovesFrom(fromPosition: Position): Position[] {
		return this.allowedDirections.flatMap((direction) =>
			this.computeAllPossibleDiagonalMovesTowards(direction, fromPosition)
		);
	}

	private computeAllPossibleDiagonalMovesTowards(
		direction: MovementDirection,
		fromPosition: Position
	): Position[] {
		let units: number;

		if (this.distancePolicy === MovementUnitsPolicy.ONE) units = 1;
		else if (this.distancePolicy === MovementUnitsPolicy.UP_TO_BOUNDARY) {
			units = this.getDistancesFromBoundary(fromPosition)[direction];
		} else throw new Error(`Unsupported distance policy: ${this.distancePolicy}`);

		if (units === 0) return [];

		return Array.from({ length: units }, (_, i) =>
			calculateDiagonalMove({ from: fromPosition, units: i + 1, towards: direction })
		);
	}
}
