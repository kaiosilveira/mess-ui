import { describe, it, expect } from 'vitest';

import type { ChessPiece } from '$lib/pieces';
import { calculateDiagonalMove } from '.';
import { MovementDirection } from '..';

describe('Piece movement', () => {
	describe('calculateDiagonalMove', () => {
		describe('invariants', () => {
			it('should not modify the original piece position', () => {
				const piece: ChessPiece = { position: [1, 2], possibleMoves: [] };
				const direction = MovementDirection.UP_RIGHT;

				calculateDiagonalMove({ piece, units: 1, towards: direction });
				expect(piece.position).toEqual([1, 2]);
			});

			it('should throw an error if the resulting position is outside the board boundaries', () => {
				const piece: ChessPiece = { position: [7, 7], possibleMoves: [] };
				expect(() =>
					calculateDiagonalMove({ piece, units: 1, towards: MovementDirection.UP_RIGHT })
				).toThrowError(`Move out of bounds: (8, 8) is outside the board boundaries.`);
			});
		});

		it('should scale the position correctly', () => {
			const piece: ChessPiece = { position: [1, 2], possibleMoves: [] };
			const towards = MovementDirection.UP_RIGHT;
			const newPosition = calculateDiagonalMove({ piece, towards, units: 1 });

			expect(newPosition).toEqual([2, 3]);
		});
	});
});
