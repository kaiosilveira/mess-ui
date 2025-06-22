import { describe, it, expect } from 'vitest';
import { type Position } from '..';
import { Pawn } from '.';

describe('Pawn', () => {
	describe('calculatePossibleMoves', () => {
		it('should return all possible moves', () => {
			const position: Position = { x: 1, y: 1 };

			const pawn = new Pawn({ position });

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
        2	| x | x | x |   |   |   |   |   |
          |---|---|---|---|---|---|---|---|
        1	|   | P |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|---|
        0	|   |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|---|
          | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
          |---|---|---|---|---|---|---|---|
      */

			const moves = pawn.calculatePossibleMoves();
			expect(moves).toHaveLength(4);
			expect(moves).toContainEqual({ x: 0, y: 2 });
			expect(moves).toContainEqual({ x: 2, y: 2 });
			expect(moves).toContainEqual({ x: 1, y: 2 });
			expect(moves).toContainEqual({ x: 1, y: 3 });
		});
	});
});
