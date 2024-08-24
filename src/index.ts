import { info } from './utils/logger'
import { Simulator } from './simulator'

const simulator = new Simulator()

process.stdin.on(`data`, (input) => {
  const command = input.toString().trim().toUpperCase()
  if (command === `EXIT`) {
    process.exit()
  } else {
    simulator.execute(command)
  }
})

info(`Toy Robot Simulator started. Enter commands or type 'exit' to quit.`)
info(`Instruction for commands: PLACE X,Y,F(EAST, WEST, NORTH, SOUTH) | MOVE | LEFT | RIGHT | REPORT`)
