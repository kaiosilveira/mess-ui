import { AbstractMovementPattern } from '$lib/movement/base/pattern';
import { calculateDiagonalMove } from '$lib/movement/diagonal/calculator';
import { type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';
import { ObstacleDetectorFactory } from '../../base/obstacle-detection/factory';

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

	computeAllPossibleMovesFrom(fromPosition: Position, obstacles: Position[] = []): Position[] {
		return this.allowedDirections.flatMap((direction) =>
			this.computeAllPossibleDiagonalMovesTowards(direction, fromPosition, obstacles)
		);
	}

	private computeAllPossibleDiagonalMovesTowards(
		direction: MovementDirection,
		fromPosition: Position,
		obstacles: Position[] = []
	): Position[] {
		let units: number;

		if (this.distancePolicy === MovementUnitsPolicy.ONE) units = 1;
		else if (this.distancePolicy === MovementUnitsPolicy.UP_TO_BOUNDARY) {
			units = this.getDistancesFromBoundary(fromPosition)[direction];
		} else throw new Error(`Unsupported distance policy: ${this.distancePolicy}`);

		if (units === 0) return [];

		let result = Array.from({ length: units }, (_, i) =>
			calculateDiagonalMove({ from: fromPosition, units: i + 1, towards: direction })
		);

		const obstacleDetector = ObstacleDetectorFactory.for(direction);

		const closestObstacle = obstacles
			.filter((obs) => result.some((move) => move.x === obs.x && move.y === obs.y))
			.reduce(obstacleDetector.reduceToClosestObstacle, null as Position | null);

		if (closestObstacle) {
			console.debug(`closest object in the ${direction} diagonal is`, closestObstacle);
			result = result.filter(obstacleDetector.filterInvalidMovesBasedOn(closestObstacle));
		}

		return result;
	}
}
