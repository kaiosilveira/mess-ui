import { MovementDirection, MovementUnitsPolicy } from '$lib/movement';
import { describe, it, expect } from 'vitest';
import { VerticalMovementPattern } from '.';

describe('VerticalMovementPattern', () => {
	it('should compute all possible vertical moves from a given position', () => {
		/*
        |---|---|---|---|---|---|---|---|
      7	|   |   | x |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      6	|   |   | x |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      5	|   |   | x |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      4	|   |   | x |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      3	|   |   | R |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      2	|   |   | x |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      1	|   |   | x |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   | x |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const rookLikeVerticalMovePattern = new VerticalMovementPattern({
			distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
      allowedDirections: [MovementDirection.UP, MovementDirection.DOWN]
		});

		const fromPosition = { x: 2, y: 3 };
		const possibleMoves = rookLikeVerticalMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(7);
		expect(possibleMoves).toContainEqual({ x: 2, y: 4 });
		expect(possibleMoves).toContainEqual({ x: 2, y: 5 });
		expect(possibleMoves).toContainEqual({ x: 2, y: 6 });
		expect(possibleMoves).toContainEqual({ x: 2, y: 7 });
		expect(possibleMoves).toContainEqual({ x: 2, y: 2 });
		expect(possibleMoves).toContainEqual({ x: 2, y: 1 });
		expect(possibleMoves).toContainEqual({ x: 2, y: 0 });
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
      4	|   |   |   |   | x |   |   |   |
        |---|---|---|---|---|---|---|---|
      3	|   |   |   |   | K |   |   |   |
        |---|---|---|---|---|---|---|---|
      2	|   |   |   |   | x |   |   |   |
        |---|---|---|---|---|---|---|---|
      1	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const kingLikeVerticalMovePattern = new VerticalMovementPattern({
			distancePolicy: MovementUnitsPolicy.ONE,
			allowedDirections: [MovementDirection.UP, MovementDirection.DOWN]
		});

		const fromPosition = { x: 4, y: 3 };
		const possibleMoves = kingLikeVerticalMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(2);
		expect(possibleMoves).toContainEqual({ x: 4, y: 4 });
		expect(possibleMoves).toContainEqual({ x: 4, y: 2 });
	});

	it('should consider direction restrictions', () => {
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
      3	|   | x |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      2	|   | x |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      1	|   | P |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const kingLikeVerticalMovePattern = new VerticalMovementPattern({
			distancePolicy: MovementUnitsPolicy.TWO,
			allowedDirections: [MovementDirection.UP]
		});

		const fromPosition = { x: 1, y: 1 };
		const possibleMoves = kingLikeVerticalMovePattern.computeAllPossibleMovesFrom(fromPosition);

		expect(possibleMoves).toHaveLength(2);
		expect(possibleMoves).toContainEqual({ x: 1, y: 2 });
		expect(possibleMoves).toContainEqual({ x: 1, y: 3 });
	});
});
