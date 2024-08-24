const VALID_HEIGHT = 5
const VALID_WIDTH = 5
export class Table {
  private width: number
  private height: number

  constructor(width: number = VALID_WIDTH, height: number = VALID_HEIGHT) {
    this.width = width
    this.height = height
  }

  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
}
