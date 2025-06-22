import { describe, it, expect } from 'vitest';

const BOARD_BOUNDARY = 7;
interface Piece {
	position: [number, number];
	get possibleMoves(): [number, number][];
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

	const overflowsX = resultingX < 0 || resultingX > BOARD_BOUNDARY;
	const overflowsY = resultingY < 0 || resultingY > BOARD_BOUNDARY;

	const resultOutOfBounds = overflowsX || overflowsY;
	return resultOutOfBounds ? undefined : [resultingX, resultingY];
};

class Bishop implements Piece {
	position: [number, number];
	constructor(deps: { position: [number, number] }) {
		this.position = deps.position;
	}

	get possibleMoves(): [number, number][] {
		const moves: [number, number][] = [];

		for (let i = 1; i <= BOARD_BOUNDARY - this.position[0]; i++) {
			const upRightMove = moveDiagonally(this, { x: i, y: i });
			if (upRightMove) moves.push(upRightMove);

			const downRightMove = moveDiagonally(this, { x: i, y: -i });
			if (downRightMove) moves.push(downRightMove);
		}

		for (let i = 1; i <= this.position[0]; i++) {
			const upLeftMove = moveDiagonally(this, { x: -i, y: i });
			if (upLeftMove) moves.push(upLeftMove);

			const downLeftMove = moveDiagonally(this, { x: -i, y: -i });
			if (downLeftMove) moves.push(downLeftMove);
		}

		return moves;
	}
}

describe('Piece movement', () => {
	describe('moveDiagonally', () => {
		describe('invariants', () => {
			it('should not modify the original piece position', () => {
				const piece: Piece = { position: [1, 2], possibleMoves: [] };
				const deltaVector: DeltaVector = { x: 1, y: 1 };

				moveDiagonally(piece, deltaVector);
				expect(piece.position).toEqual([1, 2]);
			});

			it('should throw an error if the absolute value of deltaVector.x is different from deltaVector.y', () => {
				const piece: Piece = { position: [1, 2], possibleMoves: [] };
				const deltaVector: DeltaVector = { x: 1, y: 2 };

				expect(() => moveDiagonally(piece, deltaVector)).toThrowError(
					'Invalid diagonal movement. Absolute values of x and y must be equal.'
				);
			});

			it('should return undefined if the resulting position is outside the board boundaries', () => {
				const piece: Piece = { position: [7, 7], possibleMoves: [] };
				const deltaVector: DeltaVector = { x: 1, y: 1 };

				expect(moveDiagonally(piece, deltaVector)).toBeUndefined();
			});
		});

		it('should scale the position correctly', () => {
			const piece: Piece = { position: [1, 2], possibleMoves: [] };
			const deltaVector: DeltaVector = { x: 1, y: 1 };

			const newPosition = moveDiagonally(piece, deltaVector);
			expect(newPosition).toEqual([2, 3]);
		});
	});
});

describe('Bishop', () => {
	describe('availableMoves', () => {
		describe('Bishop at starting position C1', () => {
			it('should return all diagonal moves from the current position', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   |   |   |   |   | X |
						|---|---|---|---|---|---|---|---|
					4	|   |   |   |   |   |   | X |   |
						|---|---|---|---|---|---|---|---|
					3	|   |   |   |   |   | X |   |   |
						|---|---|---|---|---|---|---|---|
					2	| X |   |   |   | X |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   | X |   | X |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | B |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const bishop = new Bishop({ position: [2, 0] });

				expect(bishop.possibleMoves).toHaveLength(7);

				expect(bishop.possibleMoves).toContainEqual([3, 1]);
				expect(bishop.possibleMoves).toContainEqual([4, 2]);
				expect(bishop.possibleMoves).toContainEqual([5, 3]);
				expect(bishop.possibleMoves).toContainEqual([6, 4]);
				expect(bishop.possibleMoves).toContainEqual([7, 5]);
				expect(bishop.possibleMoves).toContainEqual([1, 1]);
				expect(bishop.possibleMoves).toContainEqual([0, 2]);
			});
		});

		describe('Bishop at F4', () => {
			it('should return all diagonal moves from the current position', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					6	| x |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					5	|   | x |   |   |   |   |   | x |
						|---|---|---|---|---|---|---|---|
					4	|   |   | x |   |   |   | x |   |
						|---|---|---|---|---|---|---|---|
					3	|   |   |   | x |   | X |   |   |
						|---|---|---|---|---|---|---|---|
					2	|   |   |   |   | B |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   |   |   | x |   | x |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | x |   |   |   | x |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const bishop = new Bishop({ position: [4, 2] });

				expect(bishop.possibleMoves).toHaveLength(11);
				expect(bishop.possibleMoves).toContainEqual([5, 3]);
				expect(bishop.possibleMoves).toContainEqual([6, 4]);
				expect(bishop.possibleMoves).toContainEqual([7, 5]);
				expect(bishop.possibleMoves).toContainEqual([3, 3]);
				expect(bishop.possibleMoves).toContainEqual([2, 4]);
				expect(bishop.possibleMoves).toContainEqual([1, 5]);
				expect(bishop.possibleMoves).toContainEqual([0, 6]);
				expect(bishop.possibleMoves).toContainEqual([5, 1]);
				expect(bishop.possibleMoves).toContainEqual([6, 0]);
				expect(bishop.possibleMoves).toContainEqual([3, 1]);
				expect(bishop.possibleMoves).toContainEqual([2, 0]);
			});
		});
	});
});
