import { Direction, ValidActions } from './constants'

export class Robot {
  private x: number | null = null
  private y: number | null = null
  private facing: Direction | null = null

  public place(x: number, y: number, facing: Direction): void {
    this.x = x
    this.y = y
    this.facing = facing
  }

  public move(): void {
    if (this.x === null || this.y === null || this.facing === null) return

    switch (this.facing) {
      case Direction.NORTH:
        this.y++
      break;
      case Direction.SOUTH:
        this.y--
      break;
      case Direction.EAST:
        this.x++
      break;
      case Direction.WEST:
        this.x--
      break;
    }
  }

  public turnLeft(): void {
    if (this.facing === null) return

    const directions = Object.keys(Direction)
    const currentIndex = directions.indexOf(this.facing)
    this.facing = directions[(currentIndex + 3) % 4] as Direction
  }

  public turnRight(): void {
    if (this.facing === null) return

    const directions = Object.keys(Direction)
    const currentIndex = directions.indexOf(this.facing)
    this.facing = directions[(currentIndex + 1) % 4] as Direction
  }

  public report(): string | null {
    if (this.x === null || this.y === null || this.facing === null) return null
    return `${this.x},${this.y},${this.facing}`
  }

  public getPosition(): { x: number | null, y: number | null, facing: Direction | null } {
    return { x: this.x, y: this.y, facing: this.facing }
  }

  public isValidAction(action: string): boolean {
    return Object.values(ValidActions).includes(action as ValidActions)
  }
}