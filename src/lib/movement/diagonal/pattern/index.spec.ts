import { MovementDirection, MovementUnitsPolicy } from '$lib/movement';
import { describe, it, expect } from 'vitest';
import { DiagonalMovementPattern } from '.';

describe('DiagonalMovementPattern', () => {
	it('should compute all possible diagonal moves from a given position', () => {
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

		const bishopLikeDiagonalMovePattern = new DiagonalMovementPattern({
			distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
			allowedDirections: [
				MovementDirection.DOWN_RIGHT,
				MovementDirection.UP_LEFT,
				MovementDirection.DOWN_LEFT,
				MovementDirection.UP_RIGHT
			]
		});

		const fromPosition = { x: 2, y: 0 };
		const possibleMoves = bishopLikeDiagonalMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(7);
		expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
		expect(possibleMoves).toContainEqual({ x: 4, y: 2 });
		expect(possibleMoves).toContainEqual({ x: 5, y: 3 });
		expect(possibleMoves).toContainEqual({ x: 6, y: 4 });
		expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
		expect(possibleMoves).toContainEqual({ x: 1, y: 1 });
		expect(possibleMoves).toContainEqual({ x: 0, y: 2 });
	});

	it.only('should move only to allowed directions', () => {
		/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					4	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					3	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					2	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	| X |   | X |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   | P |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

		const pawnCaptureLikeDiagonalMovePattern = new DiagonalMovementPattern({
			distancePolicy: MovementUnitsPolicy.ONE,
			allowedDirections: [MovementDirection.UP_RIGHT, MovementDirection.UP_LEFT]
		});

		const fromPosition = { x: 1, y: 0 };
		const possibleMoves =
			pawnCaptureLikeDiagonalMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(2);
		expect(possibleMoves).toContainEqual({ x: 2, y: 1 });
		expect(possibleMoves).toContainEqual({ x: 0, y: 1 });
	});
});
