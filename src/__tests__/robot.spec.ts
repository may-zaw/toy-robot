import { beforeEach, describe, it, expect, vi } from 'vitest'
import { Direction, ValidActions } from '../types'
import { Robot } from '../robot'

describe('Robot', () => {
  let robot: Robot

  beforeEach(() => {
    robot = new Robot()
  })

  it('should initialize with null position and facing direction', () => {
    expect(robot.getPosition()).toEqual({ x: null, y: null, facing: null })
  })

  it('should place the robot correctly', () => {
    robot.place(1, 2, Direction.EAST)
    expect(robot.getPosition()).toEqual({ x: 1, y: 2, facing: Direction.EAST })
  })

  it('should move the robot in the current direction', () => {
    robot.place(1, 1, Direction.NORTH)
    robot.move()
    expect(robot.getPosition()).toEqual({ x: 1, y: 2, facing: Direction.NORTH })

    robot.place(1, 1, Direction.EAST)
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 2, y: 1, facing: Direction.EAST })
  })

  it('should not move if robot is not placed', () => {
    robot.move()
    expect(robot.getPosition()).toEqual({ x: null, y: null, facing: null })
  })

  it('should turn the robot left correctly', () => {
    robot.place(1, 1, Direction.NORTH)
    robot.turnLeft()
    expect(robot.getPosition()).toEqual({ x: 1, y: 1, facing: Direction.WEST })

    robot.place(1, 1, Direction.WEST);
    robot.turnLeft()
    expect(robot.getPosition()).toEqual({ x: 1, y: 1, facing: Direction.SOUTH })
  })

  it('should turn the robot right correctly', () => {
    robot.place(1, 1, Direction.NORTH)
    robot.turnRight()
    expect(robot.getPosition()).toEqual({ x: 1, y: 1, facing: Direction.EAST })

    robot.place(1, 1, Direction.EAST)
    robot.turnRight()
    expect(robot.getPosition()).toEqual({ x: 1, y: 1, facing: Direction.SOUTH })
  })

  it('should report the current position and facing direction', () => {
    robot.place(3, 4, Direction.SOUTH)
    expect(robot.report()).toBe('3,4,SOUTH')
  })

  it('should return null from report if not placed', () => {
    expect(robot.report()).toBeNull()
  })

  it('should validate actions correctly', () => {
    expect(robot.isValidAction(ValidActions.MOVE)).toBe(true)
    expect(robot.isValidAction('INVALID_ACTION')).toBe(false)
  })
})
