import { AbstractMovementPattern } from '$lib/movement/base/pattern';
import { calculateDiagonalMove } from '$lib/movement/diagonal/calculator';
import { type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';

const upLeftMatcher = (current: Position, closest: Position) =>
	current.x > closest.x && current.y < closest.y;

const upLeftObstacleFilter = (closestObstacle: Position) => (move: Position) =>
	closestObstacle && move.x > closestObstacle.x && move.y < closestObstacle?.y;

const upRightObstacleFilter = (closestObstacle: Position) => (move: Position) =>
	closestObstacle && move.x < closestObstacle.x && move.y < closestObstacle?.y;

const upRightMatcher = (current: Position, closest: Position) =>
	current.x < closest.x && current.y < closest.y;

const movesBeyondReachMatchers = {
	[MovementDirection.UP_LEFT]: upLeftMatcher,
	[MovementDirection.UP_RIGHT]: upRightMatcher
} as Record<MovementDirection, (current: Position, closest: Position) => boolean>;

const invalidMovementFilter = {
	[MovementDirection.UP_LEFT]: upLeftObstacleFilter,
	[MovementDirection.UP_RIGHT]: upRightObstacleFilter
} as Record<MovementDirection, (closestObstacle: Position) => (move: Position) => boolean>;

const closestObstacleReducer =
	(direction: MovementDirection) => (closest: Position | null, current: Position) => {
		if (!closest) return current;
		if (movesBeyondReachMatchers[direction](current, closest)) return current;
		return closest;
	};

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

		const closestObstacle = obstacles
			.filter((obs) => result.some((move) => move.x === obs.x && move.y === obs.y))
			.reduce(closestObstacleReducer(direction), null as Position | null);

		if (closestObstacle) {
			console.debug(`closest object in the ${direction} diagonal is`, closestObstacle);
			result = result.filter(invalidMovementFilter[direction](closestObstacle));
		}

		return result;
	}
}
