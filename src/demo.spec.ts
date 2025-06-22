import { describe, it, expect } from 'vitest';

interface Piece {
	position: [number, number];
}

interface DeltaVector {
	x: number;
	y: number;
}

const moveDiagonally = (piece: Piece, deltaVector: DeltaVector): [number, number] | undefined => {
	if (Math.abs(deltaVector.x) !== Math.abs(deltaVector.y)) {
		throw new Error('Invalid diagonal movement. Absolute values of x and y must be equal.');
	}

	const [x, y] = piece.position;
	const [resultingX, resultingY] = [x + deltaVector.x, y + deltaVector.y];

	const resultOutOfBounds = resultingX < 0 || resultingX > 7 || resultingY < 0 || resultingY > 7;
	return resultOutOfBounds ? undefined : [resultingX, resultingY];
};

describe('Piece movement', () => {
	describe('moveDiagonally', () => {
		describe('invariants', () => {
			it('should not modify the original piece position', () => {
				const piece: Piece = { position: [1, 2] };
				const deltaVector: DeltaVector = { x: 1, y: 1 };

				moveDiagonally(piece, deltaVector);
				expect(piece.position).toEqual([1, 2]);
			});

			it('should throw an error if the absolute value of deltaVector.x is different from deltaVector.y', () => {
				const piece: Piece = { position: [1, 2] };
				const deltaVector: DeltaVector = { x: 1, y: 2 };

				expect(() => moveDiagonally(piece, deltaVector)).toThrowError(
					'Invalid diagonal movement. Absolute values of x and y must be equal.'
				);
			});

			it('should return undefined if the resulting position is outside the board boundaries', () => {
				const piece: Piece = { position: [7, 7] };
				const deltaVector: DeltaVector = { x: 1, y: 1 };

				expect(moveDiagonally(piece, deltaVector)).toBeUndefined();
			});
		});

		it('should move a piece diagonally in positive x and positive y directions', () => {
			const piece: Piece = { position: [1, 2] };
			const deltaVector: DeltaVector = { x: 1, y: 1 };

			const newPosition = moveDiagonally(piece, deltaVector);
			expect(newPosition).toEqual([2, 3]);
		});
	});
});
