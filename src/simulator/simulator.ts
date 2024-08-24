import {  Robot } from '../core/robot'
import { Direction, ValidActions } from '../types'
import { Table } from '../core/table'

export class Simulator {
  private robot: Robot = new Robot()
  private table: Table = new Table()
  private hasPlaced: boolean = false

  public execute(command: string): void {
    const [action, params] = this.parseCommand(command);

    if (!this.isValidAction(action)) {
      console.error('Invalid action')
      return
    }

    if (action === ValidActions.PLACE) {
      this.handlePlaceCommand(params)
    } else if (this.hasPlaced) {
      this.handleMovementCommands(action)
    } else {
      this.handleNoPlaceCommand()
    }
  }

  private parseCommand(command: string): [string, string | undefined] {
    const commands = command.trim().toUpperCase().split(' ')
    return [commands[0], commands[1]]
  }

  private isValidAction(action: string): boolean {
    return this.robot.isValidAction(action)
  }

  private handlePlaceCommand(params: string | undefined): void {
    if (!params) {
      console.error('PLACE command must have 3 parameters, x, y and facing');
      return
    }

    const placeParamsArray = this.parsePlaceCommand(params);
    if (!placeParamsArray) return

    const [x, y, facing] = placeParamsArray

    if (this.table.isValidPosition(x, y)) {
      this.robot.place(x, y, facing)
      this.hasPlaced = true
    }
  }

  private handleMovementCommands(action: string): void {
    switch (action) {
      case ValidActions.MOVE:
        if (this.canMove()) this.robot.move()
        break
      case ValidActions.LEFT:
        this.robot.turnLeft()
        break;
      case ValidActions.RIGHT:
        this.robot.turnRight()
        break;
      case ValidActions.REPORT:
        this.report()
        break
      default:
        console.error('Invalid action')
    }
  }

  private handleNoPlaceCommand(): void {
    console.error('The first command must be PLACE')
  }

  private report(): void {
    const reportData = this.robot.report()
    if (reportData) {
      console.log(`Output: ${reportData}`)
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
      break
      case Direction.SOUTH:
        newY--
      break
      case Direction.EAST:
        newX++
      break
      case Direction.WEST:
        newX--
      break
    }

    return this.table.isValidPosition(newX, newY)
  }

  private isInteger(value: string): boolean {
    return /^\d+$/.test(value)
  }

  private parsePlaceCommand(params: string): [number, number, Direction] | null {
    const splitParams = params.split(',')

    if (splitParams.length !== 3) {
      console.error('PLACE command must have 3 parameters: x, y, facing');
      return null
    }

    const [xStr, yStr, facingStr] = splitParams

    const x = parseInt(xStr, 10)
    const y = parseInt(yStr, 10)

    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      console.error('x and y must be valid integers')
      return null
    }

    const facing = facingStr as Direction;
    if (!Object.values(Direction).includes(facing)) {
      console.error('Invalid direction')
      return null
    }

    return [x, y, facing]
  }
}
