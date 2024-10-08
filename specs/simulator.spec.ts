import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { Simulator } from '../src/simulator/simulator'
import { Robot } from '../src/core/robot'
import { Direction } from '../src/types'
import * as Logger from '../src/utils/logger'

describe(`Simulator`, () => {
  let simulator: Simulator

  beforeEach(() => {
    simulator = new Simulator()

    vi.spyOn(Robot.prototype, `place`).mockImplementation(() => {})
    vi.spyOn(Robot.prototype, `move`).mockImplementation(() => {})
    vi.spyOn(Robot.prototype, `turnLeft`).mockImplementation(() => {})
    vi.spyOn(Robot.prototype, `turnRight`).mockImplementation(() => {})
    vi.spyOn(Robot.prototype, `report`).mockImplementation(() => `0,0,NORTH`)
    vi.spyOn(Robot.prototype, `getPosition`).mockImplementation(() => ({ x: 0, y: 0, facing: Direction.NORTH }))
    vi.spyOn(Logger, `info`).mockImplementation((data) => data)
    vi.spyOn(Logger, `error`).mockImplementation((error) => error)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it(`should handle valid PLACE command and execute MOVE command`, () => {
    simulator.execute(`PLACE 0,0,NORTH`)
    simulator.execute(`MOVE`)

    expect(Robot.prototype.move).toHaveBeenCalled()
  })

  it(`should handle valid PLACE command and execute LEFT command`, () => {
    simulator.execute(`PLACE 0,0,NORTH`)
    simulator.execute(`LEFT`)
    expect(Robot.prototype.turnLeft).toHaveBeenCalled()
  })

  it(`should handle valid PLACE command and execute RIGHT command`, () => {
    simulator.execute(`PLACE 0,0,NORTH`)
    simulator.execute(`RIGHT`)
    expect(Robot.prototype.turnRight).toHaveBeenCalled()
  })

  it(`should handle valid PLACE command and execute REPORT command`, () => {
    simulator.execute(`PLACE 0,0,NORTH`)
    simulator.execute(`REPORT`)
    expect(Robot.prototype.report).toHaveBeenCalled()
    expect(Logger.info).toHaveBeenCalledWith(`Output: 0,0,NORTH`)
  })

  it(`should ignore MOVE command before PLACE command`, () => {
    simulator.execute(`MOVE`)
    expect(Robot.prototype.move).not.toHaveBeenCalled()
  })

  it(`should handle invalid PLACE command with missing parameters`, () => {
    simulator.execute(`PLACE 0,0`)
    expect(Logger.error).toHaveBeenCalledWith(`PLACE command must have 3 parameters: x, y, facing`)
  })

  it(`should handle invalid PLACE command with incorrect parameters`, () => {
    simulator.execute(`PLACE x,y,NORTH`)
    expect(Logger.error).toHaveBeenCalledWith(`x and y must be valid integers`)
  })

  it(`should handle invalid PLACE command with non-integer x,y values`, () => {
    simulator.execute(`PLACE 1.5,2,NORTH`)
    expect(Logger.error).toHaveBeenCalledWith(`x and y must be valid integers`)
  })

  it(`should handle invalid direction in PLACE command`, () => {
    simulator.execute(`PLACE 0,0/INVALID`)
    expect(Logger.error).toHaveBeenCalledWith(`PLACE command must have 3 parameters: x, y, facing`)
  })

  it(`should handle unknown action`, () => {
    simulator.execute(`PLACE 0,0,NORTH`)
    simulator.execute(`UNKNOWN`)
    expect(Logger.error).toHaveBeenCalledWith(`Invalid action`)
  })
})