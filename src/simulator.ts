import {  Robot } from './robot'
import { Direction, ValidActions } from './constants'
import { Table } from './table'

export class Simulator {
  private robot: Robot = new Robot()
  private table: Table = new Table()
  private hasPlaced: boolean = false

  public execute(command: string): void {
    const commands = command.trim().toUpperCase().split(` `)
    const action = commands[0]

    if (!this.robot.isValidAction(action)) {
      console.error('Invalid action')
      return
    }

    if (action === ValidActions.PLACE) {
      const placeParams = commands[1]
      if (!placeParams) {
        console.error('PLACE command must have 3 parameters, x, y and facing')
        return
      }

      const placeParamsArray = this.parsePlaceCommand(placeParams)
      if (!placeParamsArray) return

      const [x, y, facing] = placeParamsArray

      if (this.table.isValidPosition(x, y)) this.robot.place(x, y, facing)
      this.hasPlaced = true
    } else if (this.hasPlaced) {
      switch(action) {
        case ValidActions.MOVE:
          if (this.canMove()) {
            this.robot.move()
          }
          break;
        case ValidActions.LEFT:
          this.robot.turnLeft()
          break;
        case ValidActions.RIGHT:
          this.robot.turnRight()
          break;
        case ValidActions.REPORT: {
          const reportData = this.robot.report()
          if (reportData) console.log(reportData);
          break;
        }
      }
    } else {
      console.error('The first command must be PLACE')
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

  private parsePlaceCommand(params: string): [number, number, Direction] | null {
    const splitParams = params.split(',');

    if (splitParams.length !== 3) {
      console.error('PLACE command must have 3 parameters: x, y, facing');
      return null;
    }

    const [xStr, yStr, facingStr] = splitParams;

    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);

    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      console.error('x and y must be valid integers');
      return null;
    }

    const facing = facingStr as Direction;
    if (!Object.values(Direction).includes(facing)) {
      console.error('Invalid direction');
      return null;
    }

    return [x, y, facing];
  }

  private isInteger(value: string): boolean {
    return /^\d+$/.test(value);
  }
}
