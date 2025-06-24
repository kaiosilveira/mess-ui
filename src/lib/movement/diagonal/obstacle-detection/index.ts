import type { ObstacleDetector } from '$lib/movement/base/obstacle-detection';

import type { Position } from '$lib/pieces';

export class UpLeftObstacleDetector implements ObstacleDetector {
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

export class UpRightObstacleDetector implements ObstacleDetector {
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

export class DownRightObstacleDetector implements ObstacleDetector {
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

export class DownLeftObstacleDetector implements ObstacleDetector {
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
