import { MovementDirection } from '$lib/movement';
import {
	UpLeftObstacleDetector,
	UpRightObstacleDetector,
	DownRightObstacleDetector,
	DownLeftObstacleDetector
} from '$lib/movement/diagonal/obstacle-detection';
import type { ObstacleDetector } from '.';

export class ObstacleDetectorFactory {
	static for(direction: MovementDirection): ObstacleDetector {
		if (direction === MovementDirection.UP_LEFT) return new UpLeftObstacleDetector();
		else if (direction === MovementDirection.UP_RIGHT) return new UpRightObstacleDetector();
		else if (direction === MovementDirection.DOWN_RIGHT) return new DownRightObstacleDetector();
		else if (direction === MovementDirection.DOWN_LEFT) return new DownLeftObstacleDetector();
		else throw new Error(`Unsupported movement direction: ${direction}`);
	}
}
