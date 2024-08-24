# Toy Robot Instruction

## Get started

Clone the repository and navigate to the root folder:

```bash
git clone https://github.com/may-zaw/toy-robot.git
cd seek-toyrobot
```

## About this application

The Toy Robot Simulator is a command-line application that simulates the movement of a toy robot on a square tabletop. The tabletop is 5x5 units in size, and the robot can be placed, moved, rotated, and report its position based on commands issued by the user.
Below are the acceptable commands:

PLACE X,Y,F

- X: X position of the robot
- Y: Y position of the robot
- F: NORTH, SOUTH, EAST, or WEST

MOVE
LEFT
RIGHT
REPORT

Test cases commands file is located in the project src/simulator/ folder.

## Running the app with Docker

To build the app in docker

```bash
  yarn docker-build
```

To run the app in docker

```bash
  yarn docker-run
```

## Running the app without docker

Install dependencies:

```bash
  yarn install
```

Comple typescript and start the simulator:

```bash
  yarn start
```

## Running the specs

To run the test

```bash
  yarn test
```
