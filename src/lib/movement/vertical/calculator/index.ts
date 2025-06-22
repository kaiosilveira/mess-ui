import { MovementDirection } from '$lib/movement';
import { type Position, BOARD_BOUNDARY } from '$lib/pieces';

export const calculateVerticalMove = (args: {
	from: Position;
	units: number;
	towards: MovementDirection;
}): Position => {
	const { from: position, units, towards: direction } = args;

	console.debug(
		`Calculating vertical move from ${JSON.stringify(position)} towards ${direction} ${units} units`
	);

	const dY = (() => {
		if (direction === MovementDirection.UP) return units;
		else if (direction === MovementDirection.DOWN) return -units;
		else throw new Error('Invalid movement direction');
	})();

	const resultingY = position.y + dY;

	const overflowsY = resultingY < 0 || resultingY > BOARD_BOUNDARY;
	const resultOutOfBounds = overflowsY;
	if (resultOutOfBounds) {
		throw new Error(
			`Move out of bounds: (${position.x}, ${resultingY}) is outside the board boundaries.`
		);
	}

	return { x: position.x, y: resultingY };
};
