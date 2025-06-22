import { MovementDirection } from '$lib/movement';
import type { ChessPiece } from '$lib/pieces';
import { describe, expect, it } from 'vitest';
import { calculateVerticalMove } from '.';

describe('calculateVerticalMove', () => {
	describe('invariants', () => {
		it('should not modify the original piece position', () => {
			const position = { x: 1, y: 2 };
			const direction = MovementDirection.UP;

			calculateVerticalMove({ from: position, units: 1, towards: direction });
			expect(position).toEqual({ x: 1, y: 2 });
		});

		it('should throw an error if the resulting position is outside the board boundaries', () => {
			const position = { x: 7, y: 7 };
			expect(() =>
				calculateVerticalMove({ from: position, units: 1, towards: MovementDirection.UP })
			).toThrowError(`Move out of bounds: (7, 8) is outside the board boundaries.`);
		});
	});

	it('should move vertically 1 unit upwards', () => {
		const piece: ChessPiece = { position: { x: 0, y: 0 }, possibleMoves: [] };
		const towards = MovementDirection.UP;
		const newPosition = calculateVerticalMove({ from: piece.position, towards, units: 1 });

		expect(newPosition).toEqual({ x: 0, y: 1 });
	});

	it('should move vertically 2 units upwards', () => {
		const piece: ChessPiece = { position: { x: 0, y: 0 }, possibleMoves: [] };
		const towards = MovementDirection.UP;
		const newPosition = calculateVerticalMove({ from: piece.position, towards, units: 2 });

		expect(newPosition).toEqual({ x: 0, y: 2 });
	});

	it('should move vertically 1 unit downwards', () => {
		const piece: ChessPiece = { position: { x: 0, y: 5 }, possibleMoves: [] };
		const towards = MovementDirection.DOWN;
		const newPosition = calculateVerticalMove({ from: piece.position, towards, units: 1 });

		expect(newPosition).toEqual({ x: 0, y: 4 });
	});

	it('should move vertically 2 units downwards', () => {
		const piece: ChessPiece = { position: { x: 2, y: 2 }, possibleMoves: [] };
		const towards = MovementDirection.DOWN;
		const newPosition = calculateVerticalMove({ from: piece.position, towards, units: 2 });

		expect(newPosition).toEqual({ x: 2, y: 0 });
	});
});
