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

enum MovementDirection {
	UP_RIGHT = 'UP_RIGHT',
	DOWN_RIGHT = 'DOWN_RIGHT',
	UP_LEFT = 'UP_LEFT',
	DOWN_LEFT = 'DOWN_LEFT'
}

const moveDiagonally = (args: {
	piece: Piece;
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

class Bishop implements Piece {
	position: [number, number];
	constructor(deps: { position: [number, number] }) {
		this.position = deps.position;
	}

	get possibleMoves(): [number, number][] {
		const moves: [number, number][] = [];

		const distanceFromUpRightBoundary = Math.min(
			BOARD_BOUNDARY - this.position[0],
			BOARD_BOUNDARY - this.position[1]
		);

		console.log(
			`Bishop at position (${this.position}) can move up right to ${distanceFromUpRightBoundary} units.`
		);

		const distanceFromDownLeftBoundary = Math.min(this.position[0], this.position[1]);

		console.log(
			`Bishop at position (${this.position}) can move down left to ${distanceFromDownLeftBoundary} units.`
		);

		const distanceFromUpLeftBoundary = Math.min(
			this.position[0],
			BOARD_BOUNDARY - this.position[1]
		);

		console.log(
			`Bishop at position (${this.position}) can move up left to ${distanceFromUpLeftBoundary} units.`
		);

		const distanceFromDownRightBoundary = Math.min(
			BOARD_BOUNDARY - this.position[0],
			this.position[1]
		);

		console.log(
			`Bishop at position (${this.position}) can move down right to ${distanceFromDownRightBoundary} units.`
		);

		for (let i = 1; i <= distanceFromUpRightBoundary; i++) {
			const upRightMove = moveDiagonally({
				piece: this,
				units: i,
				towards: MovementDirection.UP_RIGHT
			});
			if (upRightMove) moves.push(upRightMove);
		}

		for (let i = 1; i <= distanceFromDownRightBoundary; i++) {
			const downRightMove = moveDiagonally({
				piece: this,
				units: i,
				towards: MovementDirection.DOWN_RIGHT
			});
			if (downRightMove) moves.push(downRightMove);
		}

		for (let i = 1; i <= distanceFromUpLeftBoundary; i++) {
			const upLeftMove = moveDiagonally({
				piece: this,
				units: i,
				towards: MovementDirection.UP_LEFT
			});
			if (upLeftMove) moves.push(upLeftMove);
		}

		for (let i = 1; i <= distanceFromDownLeftBoundary; i++) {
			moves.push(
				moveDiagonally({
					piece: this,
					units: i,
					towards: MovementDirection.DOWN_LEFT
				})
			);
		}

		return moves;
	}
}

describe('Piece movement', () => {
	describe('moveDiagonally', () => {
		describe('invariants', () => {
			it('should not modify the original piece position', () => {
				const piece: Piece = { position: [1, 2], possibleMoves: [] };
				const direction = MovementDirection.UP_RIGHT;

				moveDiagonally({ piece, units: 1, towards: direction });
				expect(piece.position).toEqual([1, 2]);
			});

			it('should throw an error if the resulting position is outside the board boundaries', () => {
				const piece: Piece = { position: [7, 7], possibleMoves: [] };
				expect(() =>
					moveDiagonally({ piece, units: 1, towards: MovementDirection.UP_RIGHT })
				).toThrowError(`Move out of bounds: (8, 8) is outside the board boundaries.`);
			});
		});

		it('should scale the position correctly', () => {
			const piece: Piece = { position: [1, 2], possibleMoves: [] };
			const newPosition = moveDiagonally({ piece, units: 1, towards: MovementDirection.UP_RIGHT });
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
