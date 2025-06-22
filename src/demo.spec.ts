import { describe, it, expect } from 'vitest';

const BOARD_BOUNDARY = 7;
interface ChessPiece {
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

abstract class AbstractChessPiece implements ChessPiece {
	position: [number, number];
	constructor(deps: { position: [number, number] }) {
		this.position = deps.position;
	}

	abstract get possibleMoves(): [number, number][];

	get distancesFromBoundary(): Record<MovementDirection, number> {
		const result = {
			[MovementDirection.DOWN_RIGHT]: Math.min(BOARD_BOUNDARY - this.position[0], this.position[1]),
			[MovementDirection.UP_LEFT]: Math.min(this.position[0], BOARD_BOUNDARY - this.position[1]),
			[MovementDirection.DOWN_LEFT]: Math.min(this.position[0], this.position[1]),
			[MovementDirection.UP_RIGHT]: Math.min(
				BOARD_BOUNDARY - this.position[0],
				BOARD_BOUNDARY - this.position[1]
			)
		};

		console.debug(`Bishop at (${this.position}) can move:
			- Up Right: ${result[MovementDirection.UP_RIGHT]} units
			- Down Right: ${result[MovementDirection.DOWN_RIGHT]} units
			- Up Left: ${result[MovementDirection.UP_LEFT]} units
			- Down Left: ${result[MovementDirection.DOWN_LEFT]} units`);

		return result;
	}
}

class Bishop extends AbstractChessPiece {
	constructor(deps: { position: [number, number] }) {
		super(deps);
	}

	get possibleMoves(): [number, number][] {
		return [
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.UP_RIGHT),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.DOWN_RIGHT),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.UP_LEFT),
			...this.computeAllPossibleDiagonalMovesTowards(MovementDirection.DOWN_LEFT)
		];
	}

	private computeAllPossibleDiagonalMovesTowards(direction: MovementDirection): [number, number][] {
		const units = this.distancesFromBoundary[direction];
		if (units === 0) return [];

		return Array.from({ length: units }, (_, i) =>
			moveDiagonally({ piece: this, units: i + 1, towards: direction })
		);
	}
}

describe('Piece movement', () => {
	describe('moveDiagonally', () => {
		describe('invariants', () => {
			it('should not modify the original piece position', () => {
				const piece: ChessPiece = { position: [1, 2], possibleMoves: [] };
				const direction = MovementDirection.UP_RIGHT;

				moveDiagonally({ piece, units: 1, towards: direction });
				expect(piece.position).toEqual([1, 2]);
			});

			it('should throw an error if the resulting position is outside the board boundaries', () => {
				const piece: ChessPiece = { position: [7, 7], possibleMoves: [] };
				expect(() =>
					moveDiagonally({ piece, units: 1, towards: MovementDirection.UP_RIGHT })
				).toThrowError(`Move out of bounds: (8, 8) is outside the board boundaries.`);
			});
		});

		it('should scale the position correctly', () => {
			const piece: ChessPiece = { position: [1, 2], possibleMoves: [] };
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
