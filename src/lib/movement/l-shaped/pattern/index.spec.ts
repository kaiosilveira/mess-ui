import { describe, it, expect } from 'vitest';
import { LShapedMovementPattern } from '.';

describe('LShapedMovementPattern', () => {
	it('should compute all possible L-shaped moves from a given position', () => {
		/*
        |---|---|---|---|---|---|---|---|
      7	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      6	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      5	|   |   |   | x |   | x |   |   |
        |---|---|---|---|---|---|---|---|
      4	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      3	|   |   |   |   | N |   |   |   |
        |---|---|---|---|---|---|---|---|
      2	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      1	|   |   |   | x |   | x |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const knightMovePattern = new LShapedMovementPattern();

		const fromPosition = { x: 4, y: 3 };
		const possibleMoves = knightMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(4);
		expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
		expect(possibleMoves).toContainEqual({ x: 5, y: 1 });
		expect(possibleMoves).toContainEqual({ x: 3, y: 5 });
		expect(possibleMoves).toContainEqual({ x: 5, y: 5 });
	});
});
