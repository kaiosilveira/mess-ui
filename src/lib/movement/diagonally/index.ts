import { BOARD_BOUNDARY, type ChessPiece } from '$lib/pieces';
import { MovementDirection } from '..';

export interface DeltaVector {
	x: number;
	y: number;
}

export const calculateDiagonalMove = (args: {
	piece: ChessPiece;
	units: number;
	towards: MovementDirection;
}): [number, number] => {
	const { piece, units, towards: direction } = args;

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

	const [x, y] = piece.position;
	const [resultingX, resultingY] = [x + deltaVector.x, y + deltaVector.y];

	const overflowsX = resultingX < 0 || resultingX > BOARD_BOUNDARY;
	const overflowsY = resultingY < 0 || resultingY > BOARD_BOUNDARY;

	const resultOutOfBounds = overflowsX || overflowsY;
	if (resultOutOfBounds) {
		throw new Error(
			`Move out of bounds: (${resultingX}, ${resultingY}) is outside the board boundaries.`
		);
	}

	return [resultingX, resultingY];
};
