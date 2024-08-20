import { Simulator } from './simulator'

const simulator = new Simulator()

process.stdin.on(`data`, (input) => {
  const command = input.toString().trim()
  if (command === `EXIT`) {
    process.exit()
  } else {
    simulator.execute(command)
  }
})

console.log(`Toy Robot Simulator started. Enter commands or type 'EXIT' to quit.`)
