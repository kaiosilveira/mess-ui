import { MovementDirection } from '$lib/movement';

export const BOARD_BOUNDARY = 7;

export interface ChessPiece {
	position: [number, number];
	get possibleMoves(): [number, number][];
}

export abstract class AbstractChessPiece implements ChessPiece {
	position: [number, number];
	constructor(deps: { position: [number, number] }) {
		this.position = deps.position;
	}

	abstract get possibleMoves(): [number, number][];

	get distancesFromBoundary(): Record<MovementDirection, number> {
		const result = {
			[MovementDirection.DOWN_RIGHT]: Math.min(BOARD_BOUNDARY - this.position[0], this.position[1]),
			[MovementDirection.UP_LEFT]: Math.min(this.position[0], BOARD_BOUNDARY - this.position[1]),
			[MovementDirection.DOWN_LEFT]: Math.min(this.position[0], this.position[1]),
			[MovementDirection.UP_RIGHT]: Math.min(
				BOARD_BOUNDARY - this.position[0],
				BOARD_BOUNDARY - this.position[1]
			)
		};

		console.debug(`Bishop at (${this.position}) can move:
			- Up Right: ${result[MovementDirection.UP_RIGHT]} units
			- Down Right: ${result[MovementDirection.DOWN_RIGHT]} units
			- Up Left: ${result[MovementDirection.UP_LEFT]} units
			- Down Left: ${result[MovementDirection.DOWN_LEFT]} units`);

		return result;
	}
}
