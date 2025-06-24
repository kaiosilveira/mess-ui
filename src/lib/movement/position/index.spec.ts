import { describe, it, expect } from 'vitest';
import { PositionImpl } from '.';

describe('Position', () => {
	describe('toPGN', () => {
		it('should convert position to PGN format', () => {
			const p1 = new PositionImpl(4, 3);
			const pgn = p1.toPGN();
			expect(pgn).toBe('e4');

			const p2 = new PositionImpl(0, 0);
			const pgn2 = p2.toPGN();
			expect(pgn2).toBe('a1');

			const p3 = new PositionImpl(7, 7);
			const pgn3 = p3.toPGN();
			expect(pgn3).toBe('h8');

			const p4 = new PositionImpl(6, 5);
			const pgn4 = p4.toPGN();
			expect(pgn4).toBe('g6');
		});
	});
});
