import {beforeEach, afterEach, test, expect, describe, vi} from "vitest"
import { Simulator } from "../src/simulator/simulator"

describe(`Integration Test`, () => {
  describe(`valid commands`, () => {
    let simulator
    beforeEach(() => {
      simulator = new Simulator()
    })
    afterEach(() => {
      simulator = null
    })
    test(`Robot should move and report correct position`, () => {
      simulator.execute(`PLACE 0,0,NORTH`)
      simulator.execute(`MOVE`)
      // @ts-ignore
      const output = simulator.robot.report()
      expect(output).toBe(`0,1,NORTH`)
    })
  
    test(`Robot should turn left correctly`, () => {
      simulator.execute(`PLACE 0,0,NORTH`)
      simulator.execute(`LEFT`)
      // @ts-ignore
      const output = simulator.robot.report()
      expect(output).toBe(`0,0,WEST`)
    })
  
    test(`Robot should turn right correctly`, () => {
      simulator.execute(`PLACE 0,0,NORTH`)
      simulator.execute(`RIGHT`)
      // @ts-ignore
      const output = simulator.robot.report()
      expect(output).toBe(`0,0,EAST`)
    })
  
    test(`Robot should handle edge cases without falling off the table`, () => {
      simulator.execute(`PLACE 4,4,EAST`)
      simulator.execute(`MOVE`)
      // @ts-ignore
      const output = simulator.robot.report()
      expect(output).toBe(`4,4,EAST`)
    })


  })

  describe(`invalid commands`, () => {
    let simulator
    beforeEach(() => {
      simulator = new Simulator()
      vi.spyOn(console, `error`).mockImplementation(() => {})
    })
    afterEach(() => {
      simulator = null
    })
    test(`Robot should ignore the command if the first command is not PLACE`, () => {
      simulator.execute(`REPORT`)
      expect(console.error).toHaveBeenCalledWith(`The first command must be PLACE`)
    })

    test(`The direction is invalid`, () => {
      simulator.execute(`PLACE 2,3,UP`)
      expect(console.error).toHaveBeenCalledWith(`Invalid direction`)
    })

    test(`The x, y values are not numbers`, () => {
      simulator.execute(`PLACE a,3,EAST`)
      expect(console.error).toHaveBeenCalledWith(`x and y must be valid integers`)
    })

    test(`The x, y values are not numbers`, () => {
      simulator.execute(`PLACE a,3.5,EAST`)
      expect(console.error).toHaveBeenCalledWith(`x and y must be valid integers`)
    })
  })
})