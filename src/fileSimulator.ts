import fs from 'fs'
import { Simulator } from './simulator/simulator'  // Adjust the import path according to your file structure

const commandsFilePath = `./commands.txt`
const simulator = new Simulator()

// Read commands from the file
const commands = fs.readFileSync(commandsFilePath, `utf8`).trim()

// Split the commands by line
const commandList = commands.split(`\n`)

// Execute each command
commandList.forEach(command => {
  simulator.execute(command.trim())
})

// Function to capture and compare output
const expectedOutput = `3,3,NORTH`  // Update this if the expected output changes

// Custom function to capture console.log output
const originalLog = console.log
let loggedOutput = ``

console.log = (message: string) => {
  loggedOutput = message
}

simulator.execute(`REPORT`)

// Restore the original console.log
console.log = originalLog

// Check the output
if (loggedOutput === expectedOutput) {
  console.log(`Test passed!`)
} else {
  console.error(`Test failed! Expected "${expectedOutput}", but got "${loggedOutput}".`)
}
