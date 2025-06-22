import { MovementUnitsPolicy } from '$lib/movement';
import { describe, it, expect } from 'vitest';
import { HorizontalMovementPattern } from '.';

describe('HorizontalMovementPattern', () => {
	it('should compute all possible horizontal moves from a given position', () => {
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
      1	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      0	| x | x | R | x | x | x | x | x |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const bishopLikeDiagonalMovePattern = new HorizontalMovementPattern({
			distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY
		});

		const fromPosition = { x: 2, y: 0 };
		const possibleMoves = bishopLikeDiagonalMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(7);
		expect(possibleMoves).toContainEqual({ x: 3, y: 0 });
		expect(possibleMoves).toContainEqual({ x: 4, y: 0 });
		expect(possibleMoves).toContainEqual({ x: 5, y: 0 });
		expect(possibleMoves).toContainEqual({ x: 6, y: 0 });
		expect(possibleMoves).toContainEqual({ x: 7, y: 0 });
		expect(possibleMoves).toContainEqual({ x: 0, y: 0 });
		expect(possibleMoves).toContainEqual({ x: 1, y: 0 });
	});

	it('should consider the movement units policy', () => {
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
      1	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   |   | x | K | x |   |   |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const bishopLikeDiagonalMovePattern = new HorizontalMovementPattern({
			distancePolicy: MovementUnitsPolicy.ONE
		});

		const fromPosition = { x: 4, y: 0 };
		const possibleMoves = bishopLikeDiagonalMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(2);
		expect(possibleMoves).toContainEqual({ x: 3, y: 0 });
		expect(possibleMoves).toContainEqual({ x: 5, y: 0 });
	});
});
