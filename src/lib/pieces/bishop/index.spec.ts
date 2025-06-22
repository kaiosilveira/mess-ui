import { describe, it, expect } from 'vitest';
import { Bishop } from '.';
import { DiagonalMovementPattern } from '$lib/movement/diagonal/pattern';
import { MovementDirection, MovementUnitsPolicy } from '$lib/movement';

const diagonalMover = new DiagonalMovementPattern({
	distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
	allowedDirections: [
		MovementDirection.UP_LEFT,
		MovementDirection.UP_RIGHT,
		MovementDirection.DOWN_LEFT,
		MovementDirection.DOWN_RIGHT
	]
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

				const bishop = new Bishop({ position: { x: 2, y: 0 }, diagonalMover });

				expect(bishop.possibleMoves).toHaveLength(7);

				expect(bishop.possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(bishop.possibleMoves).toContainEqual({ x: 4, y: 2 });
				expect(bishop.possibleMoves).toContainEqual({ x: 5, y: 3 });
				expect(bishop.possibleMoves).toContainEqual({ x: 6, y: 4 });
				expect(bishop.possibleMoves).toContainEqual({ x: 7, y: 5 });
				expect(bishop.possibleMoves).toContainEqual({ x: 1, y: 1 });
				expect(bishop.possibleMoves).toContainEqual({ x: 0, y: 2 });
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

				const bishop = new Bishop({ position: { x: 4, y: 2 }, diagonalMover });

				expect(bishop.possibleMoves).toHaveLength(11);
				expect(bishop.possibleMoves).toContainEqual({ x: 5, y: 3 });
				expect(bishop.possibleMoves).toContainEqual({ x: 6, y: 4 });
				expect(bishop.possibleMoves).toContainEqual({ x: 7, y: 5 });
				expect(bishop.possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(bishop.possibleMoves).toContainEqual({ x: 2, y: 0 });
				expect(bishop.possibleMoves).toContainEqual({ x: 3, y: 3 });
				expect(bishop.possibleMoves).toContainEqual({ x: 2, y: 4 });
				expect(bishop.possibleMoves).toContainEqual({ x: 1, y: 5 });
				expect(bishop.possibleMoves).toContainEqual({ x: 0, y: 6 });
				expect(bishop.possibleMoves).toContainEqual({ x: 5, y: 1 });
				expect(bishop.possibleMoves).toContainEqual({ x: 6, y: 0 });
				expect(bishop.possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(bishop.possibleMoves).toContainEqual({ x: 2, y: 0 });
			});
		});
	});
});
