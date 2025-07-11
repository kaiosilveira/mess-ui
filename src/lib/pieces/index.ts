export const BOARD_BOUNDARY = 7;

export interface Position {
	x: number;
	y: number;
}

export interface ChessPiece {
	position: Position;
	calculatePossibleMoves(): Position[];
}

export abstract class AbstractChessPiece implements ChessPiece {
	position: Position;
	constructor(deps: { position: Position }) {
		this.position = deps.position;
	}

	abstract calculatePossibleMoves(): Position[];
}
