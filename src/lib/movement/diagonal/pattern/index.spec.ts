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

	it('should move only to allowed directions', () => {
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

	describe('obstacles', () => {
		it('should compute all possible diagonal if obstacles are out of the way', () => {
			/*
        |---|---|---|---|---|---|---|---|
      7	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      6	| o | P |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      5	|   | o |   |   |   |   |   | o |
        |---|---|---|---|---|---|---|---|
      4	|   |   | o |   |   |   | o |   |
        |---|---|---|---|---|---|---|---|
      3	|   |   |   | o | P | o |   |   |
        |---|---|---|---|---|---|---|---|
      2	|   |   |   |   | B |   |   |   |
        |---|---|---|---|---|---|---|---|
      1	|   |   |   | o |   | o |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   | o |   |   |   | o |   |
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

			const fromPosition = { x: 4, y: 2 };
			const obstacles = [
				{ x: 4, y: 3 },
				{ x: 1, y: 6 }
			];

			const possibleMoves = bishopLikeDiagonalMovePattern.computeAllPossibleMovesFrom(
				fromPosition,
				obstacles
			);

			expect(possibleMoves).toHaveLength(11);
			expect(possibleMoves).toContainEqual({ x: 5, y: 3 });
			expect(possibleMoves).toContainEqual({ x: 6, y: 4 });
			expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
			expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
			expect(possibleMoves).toContainEqual({ x: 2, y: 0 });
			expect(possibleMoves).toContainEqual({ x: 5, y: 1 });
			expect(possibleMoves).toContainEqual({ x: 6, y: 0 });
			expect(possibleMoves).toContainEqual({ x: 3, y: 3 });
			expect(possibleMoves).toContainEqual({ x: 2, y: 4 });
			expect(possibleMoves).toContainEqual({ x: 1, y: 5 });
			expect(possibleMoves).toContainEqual({ x: 0, y: 6 });
		});

		describe('up-right diagonal', () => {
			it('should consider a single obstacle in the up-right diagonal', () => {
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
					2	| x |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   | x |   | P |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | B |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const obstacles = [{ x: 3, y: 1 }];
				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom({ x: 2, y: 0 }, obstacles);

				expect(possibleMoves).toHaveLength(2);
				expect(possibleMoves).toContainEqual({ x: 1, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 0, y: 2 });
			});

			it('should consider the closest obstacle if multiple are present', () => {
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
					2	| x |   |   |   | P |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   | x |   | P |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | B |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const obstacles = [
					{ x: 4, y: 2 },
					{ x: 3, y: 1 }
				];

				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom({ x: 2, y: 0 }, obstacles);

				expect(possibleMoves).toHaveLength(2);
				expect(possibleMoves).toContainEqual({ x: 1, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 0, y: 2 });
			});
		});

		describe('up-left diagonal', () => {
			it('should consider a single obstacle in the up-left diagonal', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   |   |   |   |   | o |
						|---|---|---|---|---|---|---|---|
					4	|   |   |   |   |   |   | o |   |
						|---|---|---|---|---|---|---|---|
					3	|   |   |   |   |   | o |   |   |
						|---|---|---|---|---|---|---|---|
					2	|   |   |   |   | o |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   | P |   | o |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | B |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const obstacles = [{ x: 1, y: 1 }];
				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom({ x: 2, y: 0 }, obstacles);

				expect(possibleMoves).toHaveLength(5);
				expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 4, y: 2 });
				expect(possibleMoves).toContainEqual({ x: 5, y: 3 });
				expect(possibleMoves).toContainEqual({ x: 6, y: 4 });
				expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
			});

			it('should consider the closest obstacle if multiple are present', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   |   |   |   |   | o |
						|---|---|---|---|---|---|---|---|
					4	|   |   |   |   |   |   | o |   |
						|---|---|---|---|---|---|---|---|
					3	|   |   |   |   |   | o |   |   |
						|---|---|---|---|---|---|---|---|
					2	| P |   |   |   | o |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   | P |   | o |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | B |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const obstacles = [
					{ x: 0, y: 2 },
					{ x: 1, y: 1 }
				];

				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom({ x: 2, y: 0 }, obstacles);

				expect(possibleMoves).toHaveLength(5);
				expect(possibleMoves).toContainEqual({ x: 3, y: 1 });
				expect(possibleMoves).toContainEqual({ x: 4, y: 2 });
				expect(possibleMoves).toContainEqual({ x: 5, y: 3 });
				expect(possibleMoves).toContainEqual({ x: 6, y: 4 });
				expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
			});
		});

		describe('down-right diagonal', () => {
			it('should consider the closest obstacle if there are many', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   | o |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   | o |   |   |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   | o |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					4	|   |   | o |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					3	|   | o |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					2	| B |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   | P |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   | P |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const currentPosition = { x: 0, y: 2 };
				const obstacles = [
					{ x: 2, y: 0 },
					{ x: 1, y: 1 }
				];
				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom(currentPosition, obstacles);

				expect(possibleMoves).toHaveLength(5);
				expect(possibleMoves).toContainEqual({ x: 1, y: 3 });
				expect(possibleMoves).toContainEqual({ x: 2, y: 4 });
				expect(possibleMoves).toContainEqual({ x: 3, y: 5 });
				expect(possibleMoves).toContainEqual({ x: 4, y: 6 });
				expect(possibleMoves).toContainEqual({ x: 5, y: 7 });
			});

			it('should consider a single obstacle in the down-right diagonal', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   | o |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   | o |   |   |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   | o |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					4	|   |   | o |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					3	|   | o |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					2	| B |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   | P |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const currentPosition = { x: 0, y: 2 };
				const obstacles = [{ x: 1, y: 1 }];
				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom(currentPosition, obstacles);

				expect(possibleMoves).toHaveLength(5);
				expect(possibleMoves).toContainEqual({ x: 1, y: 3 });
				expect(possibleMoves).toContainEqual({ x: 2, y: 4 });
				expect(possibleMoves).toContainEqual({ x: 3, y: 5 });
				expect(possibleMoves).toContainEqual({ x: 4, y: 6 });
				expect(possibleMoves).toContainEqual({ x: 5, y: 7 });
			});
		});

		describe('down-left diagonal', () => {
			it('should consider the closest obstacle if there are many', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   | B |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   | o |   | o |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   | o |   |   |   | o |
						|---|---|---|---|---|---|---|---|
					4	|   |   | P |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					3	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					2	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const currentPosition = { x: 5, y: 7 };
				const obstacles = [{ x: 2, y: 4 }];

				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom(currentPosition, obstacles);

				expect(possibleMoves).toHaveLength(4);
				expect(possibleMoves).toContainEqual({ x: 6, y: 6 });
				expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
				expect(possibleMoves).toContainEqual({ x: 4, y: 6 });
				expect(possibleMoves).toContainEqual({ x: 3, y: 5 });
			});

			it('should consider a single obstacle in the down-right diagonal', () => {
				/*
						|---|---|---|---|---|---|---|---|
					7	|   |   |   |   |   | B |   |   |
						|---|---|---|---|---|---|---|---|
					6	|   |   |   |   | P |   | o |   |
						|---|---|---|---|---|---|---|---|
					5	|   |   |   |   |   |   |   | o |
						|---|---|---|---|---|---|---|---|
					4	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					3	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					2	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					1	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
					0	|   |   |   |   |   |   |   |   |
						|---|---|---|---|---|---|---|---|
						| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
						|---|---|---|---|---|---|---|---|
				*/

				const currentPosition = { x: 5, y: 7 };
				const obstacles = [{ x: 4, y: 6 }];

				const possibleMoves = new DiagonalMovementPattern({
					distancePolicy: MovementUnitsPolicy.UP_TO_BOUNDARY,
					allowedDirections: [
						MovementDirection.DOWN_RIGHT,
						MovementDirection.UP_LEFT,
						MovementDirection.DOWN_LEFT,
						MovementDirection.UP_RIGHT
					]
				}).computeAllPossibleMovesFrom(currentPosition, obstacles);

				expect(possibleMoves).toHaveLength(2);
				expect(possibleMoves).toContainEqual({ x: 6, y: 6 });
				expect(possibleMoves).toContainEqual({ x: 7, y: 5 });
			});
		});
	});
});
