import {  Robot } from './robot'
import { Direction } from './direction'
import { Table } from './table'

export class Simulator {
  private robot: Robot = new Robot()
  private table: Table = new Table()
  private hasPlaced: boolean = false

  public execute(command: string): void {
    const commands = command.trim().toUpperCase().split(` `)
    const action = commands[0]
    if (action === `PLACE`) {
      const [x, y, facing] = this.parsePlaceCommand(commands[1])
      if (this.table.isValidPosition(x, y)) this.robot.place(x, y, facing)
      this.hasPlaced = true
    } else if (this.hasPlaced) {
      switch(action) {
        case 'MOVE':
          if (this.canMove()) this.robot.move()
          break;
        case 'LEFT':
          this.robot.turnLeft()
          break;
        case 'RIGHT':
          this.robot.turnRight()
          break;
        case 'REPORT': {
          const report = this.robot.report()
          if (report) console.log(report);
          break;
        }

        }
    } else {
      throw new Error('The first movement is not PLACE')

    }
  }

  private canMove(): boolean {
    const { x, y, facing } = this.robot.getPosition()
    if (x === null || y === null || facing === null) return false

    let newX = x
    let newY = y

    switch (facing) {
      case Direction.NORTH:
        newY++
      break;
      case Direction.SOUTH:
        newY--
      break;
      case Direction.EAST:
        newX++
      break;
      case Direction.WEST:
        newX--
      break;
    }

    return this.table.isValidPosition(newX, newY)
  }

  private parsePlaceCommand(params: string): [number, number, Direction] {
    const [x, y, facing] = params.split(`,`)
    return [parseInt(x), parseInt(y), facing as Direction]
  }
}
