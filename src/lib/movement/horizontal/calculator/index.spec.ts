import { MovementDirection } from '$lib/movement';
import type { ChessPiece } from '$lib/pieces';
import { describe, expect, it } from 'vitest';
import { calculateHorizontalMove } from '.';

describe('calculateHorizontalMove', () => {
	describe('invariants', () => {
		it('should not modify the original piece position', () => {
			const position = { x: 1, y: 2 };
			const direction = MovementDirection.RIGHT;

			calculateHorizontalMove({ from: position, units: 1, towards: direction });
			expect(position).toEqual({ x: 1, y: 2 });
		});

		it('should throw an error if the resulting position is outside the board boundaries', () => {
			const position = { x: 7, y: 7 };
			expect(() =>
				calculateHorizontalMove({ from: position, units: 1, towards: MovementDirection.RIGHT })
			).toThrowError(`Move out of bounds: (8, 7) is outside the board boundaries.`);
		});
	});

	it('should move horizontally 1 unit towards the right', () => {
		const piece: ChessPiece = { position: { x: 0, y: 0 }, possibleMoves: [] };
		const towards = MovementDirection.RIGHT;
		const newPosition = calculateHorizontalMove({ from: piece.position, towards, units: 1 });

		expect(newPosition).toEqual({ x: 1, y: 0 });
	});

	it('should move horizontally 2 units towards the right', () => {
		const piece: ChessPiece = { position: { x: 0, y: 0 }, possibleMoves: [] };
		const towards = MovementDirection.RIGHT;
		const newPosition = calculateHorizontalMove({ from: piece.position, towards, units: 2 });

		expect(newPosition).toEqual({ x: 2, y: 0 });
	});
});
