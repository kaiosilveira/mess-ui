import { calculateDiagonalMove } from '$lib/movement/diagonal/calculator';
import { BOARD_BOUNDARY, type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';

export class DiagonalMovementPattern {
	private readonly allowedDirections: MovementDirection[];
	private readonly distancePolicy: MovementUnitsPolicy;

	constructor(deps: {
		allowedDirections: MovementDirection[];
		distancePolicy: MovementUnitsPolicy;
	}) {
		this.allowedDirections = deps.allowedDirections;
		this.distancePolicy = deps.distancePolicy;
	}

	getDistancesFromBoundary(from: Position): Record<MovementDirection, number> {
		return {
			[MovementDirection.DOWN_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, from.y),
			[MovementDirection.UP_LEFT]: Math.min(from.x, BOARD_BOUNDARY - from.y),
			[MovementDirection.DOWN_LEFT]: Math.min(from.x, from.y),
			[MovementDirection.UP_RIGHT]: Math.min(BOARD_BOUNDARY - from.x, BOARD_BOUNDARY - from.y)
		};
	}

	computeAllPossibleMovesFrom(fromPosition: Position): Position[] {
		return this.allowedDirections.flatMap((direction) =>
			this.computeAllPossibleDiagonalMovesTowards(direction, fromPosition)
		);
	}

	computeAllPossibleDiagonalMovesTowards(
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
