import {  Robot } from '../core/robot'
import { Direction, ValidActions } from '../types'
import { Table } from '../core/table'
import {error, info} from '../utils'

export class Simulator {
  private robot: Robot = new Robot()
  private table: Table = new Table()
  private hasPlaced: boolean = false

  public execute(command: string): void {
    try {
      const [action, params] = this.parseCommand(command)

      if (!this.isValidAction(action)) {
        error(`Invalid action`)
        return
      }

      if (action === ValidActions.PLACE) {
        this.handlePlaceCommand(params)
      } else if (this.hasPlaced) {
        this.handleMovementCommands(action)
      } else {
        this.handleNoPlaceCommand()
      }
    } catch (e) {
      error(e.message)
    } 
  }

  private parseCommand(command: string): [string, string | undefined] {
    const commands = command.trim().toUpperCase().split(` `)
    if (commands.length <= 2) 
      return [commands[0], commands[1]]
    else { // handle space in the command
      return [commands[0], commands.slice(1).join(` `)]
    }
  }

  private isValidAction(action: string): boolean {
    return this.robot.isValidAction(action)
  }

  private handlePlaceCommand(params: string | undefined): void {
    if (!params) {
      throw new Error(`PLACE command must have 3 parameters, x, y and facing`)
    }

    const placeParamsArray = this.parsePlaceCommand(params)
    if (!placeParamsArray) return

    const [x, y, facing] = placeParamsArray

    if (this.table.isValidPosition(x, y)) {
      this.robot.place(x, y, facing)
      this.hasPlaced = true
    } else {
      throw new Error(`Invalid place position`)
    }
  }

  private handleMovementCommands(action: string): void {
    switch (action) {
      case ValidActions.MOVE:
        if (this.canMove()) this.robot.move()
        break
      case ValidActions.LEFT:
        this.robot.turnLeft()
        break
      case ValidActions.RIGHT:
        this.robot.turnRight()
        break
      case ValidActions.REPORT:
        this.report()
        break
      default:
        throw new Error(`Invalid action`)
    }
  }

  private handleNoPlaceCommand(): void {
    throw new Error(`The first command must be PLACE`)
  }

  private report(): void {
    const reportData = this.robot.report()
    if (reportData) {
      info(`Output: ${reportData}`)
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

  private parsePlaceCommand(params: string): [number, number, Direction] | null {
    const splitParams = params.split(`,`)

    if (splitParams.length !== 3) {
      throw new Error(`PLACE command must have 3 parameters: x, y, facing`)
    }

    const [xStr, yStr, facingStr] = splitParams
    const xNum = Number(xStr)
    const yNum = Number(yStr)

    if (!Number.isInteger(xNum) || !Number.isInteger(yNum)) {
      throw new Error(`x and y must be valid integers`)
    }

    const facing = facingStr.trim() as Direction
    if (!Object.values(Direction).includes(facing)) {
      throw new Error(`Invalid direction`)
    }

    return [xNum, yNum, facing]
  }
}
