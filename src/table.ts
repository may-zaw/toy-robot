export class Table {
  private width: number
  private height: number

  constructor(width: number = 5, height: number = 5) {
    this.width = width
    this.height = height
  }

  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
}
