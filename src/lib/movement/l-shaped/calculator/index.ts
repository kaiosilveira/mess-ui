import { MovementDirection } from '$lib/movement';
import { type Position, BOARD_BOUNDARY } from '$lib/pieces';

export const calculateLShapedMove = (args: {
	from: Position;
	towards: MovementDirection;
}): Position => {
	const { from: position, towards: direction } = args;

	console.debug(`Calculating vertical move from ${JSON.stringify(position)} towards ${direction}`);

	const dY = (() => {
		if (
			direction === MovementDirection.L_SHAPED_UP_LEFT ||
			direction === MovementDirection.L_SHAPED_UP_RIGHT
		)
			return 2;
		else if (
			direction === MovementDirection.L_SHAPED_DOWN_LEFT ||
			direction === MovementDirection.L_SHAPED_DOWN_RIGHT
		)
			return -2;
		else if (
			direction === MovementDirection.L_SHAPED_LEFT_UP ||
			direction === MovementDirection.L_SHAPED_RIGHT_UP
		)
			return 1;
		else if (
			direction === MovementDirection.L_SHAPED_LEFT_DOWN ||
			direction === MovementDirection.L_SHAPED_RIGHT_DOWN
		)
			return -1;
		else throw new Error('Invalid movement direction');
	})();

	const dX = (() => {
		if (
			direction === MovementDirection.L_SHAPED_UP_LEFT ||
			direction === MovementDirection.L_SHAPED_DOWN_LEFT
		)
			return -1;
		else if (
			direction === MovementDirection.L_SHAPED_UP_RIGHT ||
			direction === MovementDirection.L_SHAPED_DOWN_RIGHT
		)
			return 1;
		else if (
			direction === MovementDirection.L_SHAPED_LEFT_UP ||
			direction === MovementDirection.L_SHAPED_LEFT_DOWN
		)
			return -2;
		else if (
			direction === MovementDirection.L_SHAPED_RIGHT_UP ||
			direction === MovementDirection.L_SHAPED_RIGHT_DOWN
		)
			return 2;
		else throw new Error('Invalid movement direction');
	})();

	const resultingX = position.x + dX;
	const resultingY = position.y + dY;
	const overflowsX = resultingX < 0 || resultingX > BOARD_BOUNDARY;
	const overflowsY = resultingY < 0 || resultingY > BOARD_BOUNDARY;
	const resultOutOfBounds = overflowsX || overflowsY;
	if (resultOutOfBounds) {
		throw new Error(
			`Move out of bounds: (${resultingX}, ${resultingY}) is outside the board boundaries.`
		);
	}

	const result = { x: resultingX, y: resultingY };
	console.debug(`Resulting position after vertical move: (${JSON.stringify(result)})`);
	return result;
};
