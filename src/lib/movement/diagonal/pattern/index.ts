import { AbstractMovementPattern } from '$lib/movement/base/pattern';
import { calculateDiagonalMove } from '$lib/movement/diagonal/calculator';
import { type Position } from '$lib/pieces';
import { MovementDirection, MovementUnitsPolicy } from '../..';

const upLeftMatcher = (current: Position, closest: Position) =>
	current.x > closest.x && current.y < closest.y;

const upRightMatcher = (current: Position, closest: Position) =>
	current.x < closest.x && current.y < closest.y;

const downRightMatcher = (current: Position, closest: Position) =>
	current.x < closest.x && current.y > closest.y;

const downLeftMatcher = (current: Position, closest: Position) =>
	current.x > closest.x && current.y > closest.y;

const upLeftObstacleFilter = (closestObstacle: Position) => (move: Position) =>
	closestObstacle && move.x > closestObstacle.x && move.y < closestObstacle?.y;

const upRightObstacleFilter = (closestObstacle: Position) => (move: Position) =>
	closestObstacle && move.x < closestObstacle.x && move.y < closestObstacle?.y;

const downRightObstacleFilter = (closestObstacle: Position) => (move: Position) =>
	closestObstacle && move.x < closestObstacle.x && move.y > closestObstacle?.y;

const downLeftObstacleFilter = (closestObstacle: Position) => (move: Position) =>
	closestObstacle && move.x > closestObstacle.x && move.y > closestObstacle?.y;

class UpLeftObstacleDetector {
	static matchValidMove(current: Position, closest: Position): boolean {
		return upLeftMatcher(current, closest);
	}

	static filterInvalidMove(closestObstacle: Position): (move: Position) => boolean {
		return upLeftObstacleFilter(closestObstacle);
	}
}

class UpRightObstacleDetector {
	static matchValidMove(current: Position, closest: Position): boolean {
		return upRightMatcher(current, closest);
	}

	static filterInvalidMove(closestObstacle: Position): (move: Position) => boolean {
		return upRightObstacleFilter(closestObstacle);
	}
}

class DownRightObstacleDetector {
	static matchValidMove(current: Position, closest: Position): boolean {
		return downRightMatcher(current, closest);
	}

	static filterInvalidMove(closestObstacle: Position): (move: Position) => boolean {
		return downRightObstacleFilter(closestObstacle);
	}
}

class DownLeftObstacleDetector {
	static matchValidMove(current: Position, closest: Position): boolean {
		return downLeftMatcher(current, closest);
	}

	static filterInvalidMove(closestObstacle: Position): (move: Position) => boolean {
		return downLeftObstacleFilter(closestObstacle);
	}
}

const objectDetectors = {
	[MovementDirection.UP_LEFT]: UpLeftObstacleDetector,
	[MovementDirection.UP_RIGHT]: UpRightObstacleDetector,
	[MovementDirection.DOWN_RIGHT]: DownRightObstacleDetector,
	[MovementDirection.DOWN_LEFT]: DownLeftObstacleDetector
} as Record<MovementDirection, typeof UpLeftObstacleDetector>;

const closestObstacleReducer =
	(direction: MovementDirection) => (closest: Position | null, current: Position) => {
		if (!closest) return current;
		if (objectDetectors[direction].matchValidMove(current, closest)) return current;
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
			result = result.filter(objectDetectors[direction].filterInvalidMove(closestObstacle));
		}

		return result;
	}
}
