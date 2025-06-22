import { MovementDirection } from '$lib/movement';
import { type Position, BOARD_BOUNDARY } from '$lib/pieces';

export const calculateHorizontalMove = (args: {
	from: Position;
	units: number;
	towards: MovementDirection;
}): Position => {
	const { from: position, units, towards: direction } = args;

	console.debug(
		`Calculating horizontal move from ${JSON.stringify(position)} towards ${direction} ${units} units`
	);

	const dX = (() => {
		if (direction === MovementDirection.RIGHT) return units;
		else if (direction === MovementDirection.LEFT) return -units;
		else throw new Error('Invalid movement direction');
	})();

	const resultingX = position.x + dX;

	const overflowsX = resultingX < 0 || resultingX > BOARD_BOUNDARY;
	const resultOutOfBounds = overflowsX;
	if (resultOutOfBounds) {
		throw new Error(
			`Move out of bounds: (${resultingX}, ${position.y}) is outside the board boundaries.`
		);
	}

	return { x: resultingX, y: position.y };
};
