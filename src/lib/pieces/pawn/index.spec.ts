import { DiagonalMovementPattern } from '$lib/movement/diagonal/pattern';
import { VerticalMovementPattern } from '$lib/movement/vertical/pattern';
import { describe, it, expect } from 'vitest';
import { AbstractChessPiece, type Position } from '..';
import { MovementDirection, MovementUnitsPolicy } from '$lib/movement';

export class Pawn extends AbstractChessPiece {
	private diagonalMover: DiagonalMovementPattern;
	private verticalMover: VerticalMovementPattern;

	constructor(deps: { position: Position }) {
		super(deps);

		this.diagonalMover = new DiagonalMovementPattern({
			allowedDirections: [MovementDirection.UP_LEFT, MovementDirection.UP_RIGHT],
			distancePolicy: MovementUnitsPolicy.ONE
		});

		this.verticalMover = new VerticalMovementPattern({
			distancePolicy: MovementUnitsPolicy.TWO,
			allowedDirections: [MovementDirection.UP]
		});
	}

	get possibleMoves(): Position[] {
		return [
			...this.diagonalMover.computeAllPossibleMovesFrom(this.position),
			...this.verticalMover.computeAllPossibleMovesFrom(this.position)
		];
	}
}

describe('Pawn', () => {
	describe('possibleMoves', () => {
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

			const moves = pawn.possibleMoves;
			expect(moves).toHaveLength(4);
			expect(moves).toContainEqual({ x: 0, y: 2 });
			expect(moves).toContainEqual({ x: 2, y: 2 });
			expect(moves).toContainEqual({ x: 1, y: 2 });
			expect(moves).toContainEqual({ x: 1, y: 3 });
		});
	});
});
