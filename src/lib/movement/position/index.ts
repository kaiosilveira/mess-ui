export class PositionImpl {
	constructor(
		public x: number,
		public y: number
	) {}

	toPGN(): string {
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		return `${letters[this.x]}${this.y + 1}`;
	}
}
