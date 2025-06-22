import { MovementDirection, type DeltaVector } from '$lib/movement';
import { type Position, BOARD_BOUNDARY } from '$lib/pieces';

export const calculateDiagonalMove = (args: {
	from: Position;
	units: number;
	towards: MovementDirection;
}): Position => {
	const { from: position, units, towards: direction } = args;

	const deltaVector: DeltaVector = (() => {
		switch (direction) {
			case MovementDirection.UP_RIGHT:
				return { x: units, y: units };
			case MovementDirection.DOWN_RIGHT:
				return { x: units, y: -units };
			case MovementDirection.UP_LEFT:
				return { x: -units, y: units };
			case MovementDirection.DOWN_LEFT:
				return { x: -units, y: -units };
			default:
				throw new Error('Invalid movement direction');
		}
	})();

	const { x, y } = position;
	const { x: resultingX, y: resultingY } = { x: x + deltaVector.x, y: y + deltaVector.y };

	const overflowsX = resultingX < 0 || resultingX > BOARD_BOUNDARY;
	const overflowsY = resultingY < 0 || resultingY > BOARD_BOUNDARY;

	const resultOutOfBounds = overflowsX || overflowsY;
	if (resultOutOfBounds) {
		throw new Error(
			`Move out of bounds: (${resultingX}, ${resultingY}) is outside the board boundaries.`
		);
	}

	return { x: resultingX, y: resultingY };
};
