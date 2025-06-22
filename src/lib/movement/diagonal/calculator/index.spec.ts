import { MovementDirection } from '$lib/movement';
import type { ChessPiece } from '$lib/pieces';
import { describe, expect, it } from 'vitest';
import { calculateDiagonalMove } from '.';

describe('calculateDiagonalMove', () => {
	describe('invariants', () => {
		it('should not modify the original piece position', () => {
			const piece: ChessPiece = { position: { x: 1, y: 2 }, calculatePossibleMoves: [] };
			const direction = MovementDirection.UP_RIGHT;

			calculateDiagonalMove({ from: piece.position, units: 1, towards: direction });
			expect(piece.position).toEqual({ x: 1, y: 2 });
		});

		it('should throw an error if the resulting position is outside the board boundaries', () => {
			const position = { x: 7, y: 7 };
			expect(() =>
				calculateDiagonalMove({ from: position, units: 1, towards: MovementDirection.UP_RIGHT })
			).toThrowError(`Move out of bounds: (8, 8) is outside the board boundaries.`);
		});
	});

	it('should scale the position correctly', () => {
		const piece: ChessPiece = { position: { x: 1, y: 2 }, calculatePossibleMoves: [] };
		const towards = MovementDirection.UP_RIGHT;
		const newPosition = calculateDiagonalMove({ from: piece.position, towards, units: 1 });

		expect(newPosition).toEqual({ x: 2, y: 3 });
	});
});
