import {beforeAll, test, expect, describe} from 'vitest'
import { Simulator } from '../simulator'


describe(`Simulator`, () => {


  describe(`valid commands`, () => {
    let simulator
    beforeAll(() => {
      simulator = new Simulator()
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
    beforeAll(() => {
      simulator = new Simulator()
    })
    test(`The first movement is not PLACE`, () => {
      // @ts-ignore
      expect(() => simulator.execute(`EAST,0,PLACE 4`)).toThrowError(
        /^The first movement is not PLACE$/,
      )
    })

    test(`The command is wrong`, () => {
      // @ts-ignore
      simulator.execute(`PLACE 2,3,UP`)
      simulator.execute(`MOVE`)
      // @ts-ignore
      const output = simulator.robot.report()
      console.log(output)
      expect(output).toBe(`Wrong command`)
    })
  })
})