import { describe, it, expect } from 'vitest';
import { Bishop } from '.';

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
