import { MovementDirection } from '$lib/movement';
import { describe, expect, it } from 'vitest';
import { calculateLShapedMove } from '.';

describe('calculateLShapedMove', () => {
	describe('invariants', () => {
		it('should not modify the original piece position', () => {
			const position = { x: 1, y: 2 };
			const direction = MovementDirection.L_SHAPED_DOWN_LEFT;

			calculateLShapedMove({ from: position, towards: direction });
			expect(position).toEqual({ x: 1, y: 2 });
		});

		it('should throw an error if the resulting position is outside the board boundaries', () => {
			const position = { x: 7, y: 7 };
			expect(() =>
				calculateLShapedMove({ from: position, towards: MovementDirection.L_SHAPED_UP_RIGHT })
			).toThrowError(`Move out of bounds: (8, 9) is outside the board boundaries.`);
		});
	});

	it('should move up and to the left', () => {
		/*
        |---|---|---|---|---|---|---|---|
      7	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      6	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      5	|   |   |   | x |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      4	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      3	|   |   |   |   | N |   |   |   |
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

		const position = { x: 4, y: 3 };
		const direction = MovementDirection.L_SHAPED_UP_LEFT;
		const newPosition = calculateLShapedMove({ from: position, towards: direction });

		expect(newPosition).toEqual({ x: 3, y: 5 });
	});

	it('should move up and to the right', () => {
		/*
        |---|---|---|---|---|---|---|---|
      7	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      6	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      5	|   |   |   |   |   | x |   |   |
        |---|---|---|---|---|---|---|---|
      4	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      3	|   |   |   |   | N |   |   |   |
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

		const position = { x: 4, y: 3 };
		const direction = MovementDirection.L_SHAPED_UP_RIGHT;
		const newPosition = calculateLShapedMove({ from: position, towards: direction });

		expect(newPosition).toEqual({ x: 5, y: 5 });
	});

	it('should move down and to the left', () => {
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
      3	|   |   |   |   | N |   |   |   |
        |---|---|---|---|---|---|---|---|
      2	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      1	|   |   |   | x |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const position = { x: 4, y: 3 };
		const direction = MovementDirection.L_SHAPED_DOWN_LEFT;
		const newPosition = calculateLShapedMove({ from: position, towards: direction });

		expect(newPosition).toEqual({ x: 3, y: 1 });
	});

	it('should move down and to the right', () => {
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
      3	|   |   |   |   | N |   |   |   |
        |---|---|---|---|---|---|---|---|
      2	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
      1	|   |   |   |   |   | x |   |   |
        |---|---|---|---|---|---|---|---|
      0	|   |   |   |   |   |   |   |   |
        |---|---|---|---|---|---|---|---|
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |---|---|---|---|---|---|---|---|
    */

		const position = { x: 4, y: 3 };
		const direction = MovementDirection.L_SHAPED_DOWN_RIGHT;
		const newPosition = calculateLShapedMove({ from: position, towards: direction });

		expect(newPosition).toEqual({ x: 5, y: 1 });
	});
});
