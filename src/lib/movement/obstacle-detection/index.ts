import { MovementDirection } from '$lib/movement';
import type { Position } from '$lib/pieces';

export interface ObstacleDetector {
	filterInvalidMovesBasedOn: (closestObstacle: Position) => (move: Position) => boolean;
	reduceToClosestObstacle: (candidate: Position | null, current: Position) => Position;
}

class UpLeftObstacleDetector implements ObstacleDetector {
	reduceToClosestObstacle(candidate: Position | null, current: Position): Position {
		if (!candidate) return current;
		if (current.x > candidate.x && current.y < candidate.y) return current;
		return candidate;
	}

	filterInvalidMovesBasedOn(closestObstacle: Position): (move: Position) => boolean {
		return (move: Position) =>
			closestObstacle && move.x > closestObstacle.x && move.y < closestObstacle?.y;
	}
}

class UpRightObstacleDetector implements ObstacleDetector {
	reduceToClosestObstacle(candidate: Position | null, current: Position): Position {
		if (!candidate) return current;
		if (current.x < candidate.x && current.y < candidate.y) return current;
		return candidate;
	}

	filterInvalidMovesBasedOn(closestObstacle: Position): (move: Position) => boolean {
		return (move: Position) =>
			closestObstacle && move.x < closestObstacle.x && move.y < closestObstacle?.y;
	}
}

class DownRightObstacleDetector implements ObstacleDetector {
	reduceToClosestObstacle(candidate: Position | null, current: Position): Position {
		if (!candidate) return current;
		if (current.x < candidate.x && current.y > candidate.y) return current;
		return candidate;
	}

	filterInvalidMovesBasedOn(closestObstacle: Position): (move: Position) => boolean {
		return (move: Position) =>
			closestObstacle && move.x < closestObstacle.x && move.y > closestObstacle?.y;
	}
}

class DownLeftObstacleDetector implements ObstacleDetector {
	reduceToClosestObstacle(candidate: Position | null, current: Position): Position {
		if (!candidate) return current;
		if (current.x > candidate.x && current.y > candidate.y) return current;
		return candidate;
	}

	filterInvalidMovesBasedOn(closestObstacle: Position): (move: Position) => boolean {
		return (move: Position) =>
			closestObstacle && move.x > closestObstacle.x && move.y > closestObstacle?.y;
	}
}

export class ObstacleDetectorFactory {
	static for(direction: MovementDirection): ObstacleDetector {
		if (direction === MovementDirection.UP_LEFT) return new UpLeftObstacleDetector();
		else if (direction === MovementDirection.UP_RIGHT) return new UpRightObstacleDetector();
		else if (direction === MovementDirection.DOWN_RIGHT) return new DownRightObstacleDetector();
		else if (direction === MovementDirection.DOWN_LEFT) return new DownLeftObstacleDetector();
		else throw new Error(`Unsupported movement direction: ${direction}`);
	}
}
