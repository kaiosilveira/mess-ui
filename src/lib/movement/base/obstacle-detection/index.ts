import type { Position } from '$lib/pieces';

export interface ObstacleDetector {
	filterInvalidMovesBasedOn: (closestObstacle: Position) => (move: Position) => boolean;
	reduceToClosestObstacle: (candidate: Position | null, current: Position) => Position;
}
