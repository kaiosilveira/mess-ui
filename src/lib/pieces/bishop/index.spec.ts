import { describe, it, expect } from 'vitest';
import { Bishop } from '.';

describe('Bishop', () => {
	describe('calculatePossibleMoves', () => {
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

				const bishop = new Bishop({ position: { x: 2, y: 0 } });

				const possibleMoves = bishop.calculatePossibleMoves();
				expect(possibleMoves).toHaveLength(7);

				expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 4, y: 2 });
				expect(possibleMoves).toContainEqual({ x: 5, y: 3 });
				expect(possibleMoves).toContainEqual({ x: 6, y: 4 });
				expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
				expect(possibleMoves).toContainEqual({ x: 1, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 0, y: 2 });
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

				const bishop = new Bishop({ position: { x: 4, y: 2 } });
				const possibleMoves = bishop.calculatePossibleMoves();

				expect(possibleMoves).toHaveLength(11);
				expect(possibleMoves).toContainEqual({ x: 5, y: 3 });
				expect(possibleMoves).toContainEqual({ x: 6, y: 4 });
				expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
				expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 2, y: 0 });
				expect(possibleMoves).toContainEqual({ x: 3, y: 3 });
				expect(possibleMoves).toContainEqual({ x: 2, y: 4 });
				expect(possibleMoves).toContainEqual({ x: 1, y: 5 });
				expect(possibleMoves).toContainEqual({ x: 0, y: 6 });
				expect(possibleMoves).toContainEqual({ x: 5, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 6, y: 0 });
				expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 2, y: 0 });
			});
		});

		describe('Should consider obstacles on the path', () => {
			it('should not be able to move if there are two pawns on (1,1) and (3,1)', () => {
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
					1	|   | P |   | P |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | B |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const bishop = new Bishop({ position: { x: 2, y: 2 } });
				const possibleMoves = bishop.calculatePossibleMoves({
					obstacles: [
						{ x: 1, y: 1 },
						{ x: 3, y: 1 }
					]
				});

				expect(possibleMoves).toHaveLength(0);
			});
		});
	});
});
