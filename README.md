# Mars Rover Simulation

This project implements a Mars Rover that can be controlled via a command string from Earth. The rover executes Part I (moving and rotating based on commands) and Part II (detecting obstacles and stopping if necessary) of the task. It moves on a 2D grid, can rotate, move forward or backwards, and stops when it encounters obstacles.

---

## Features

- Move the rover forward (`F`) or backwards (`B`) on its current heading.
- Rotate the rover left (`L`) or right (`R`) by 90°.
- Translate a command string into rover actions.
- Handle obstacles: rover stops if it encounters an obstacle and reports `STOPPED`.
- Unit tests cover normal operations, obstacles, edge cases, and invalid inputs.

---

## Installation

```bash
git clone https://github.com/hebaeissa51/task-front-end-penta-b
cd task-front-end-penta-b
npm install
```

---

## Usage

### Setup Rover

```js
const { setupRover, translateCommands, roverReport } = require('./src/rover');

// Initialize rover at (x=0, y=0) facing NORTH
const rover = setupRover(0, 0, "NORTH");
```

### Translate Commands

```js
// Example command without obstacles
const rover1 = setupRover(4, 2, "EAST");
const result1 = translateCommands(rover1, "FLFFFRFLB");
console.log(roverReport(result1));  // Output: "(6, 4) NORTH"

// Example command with obstacles
const obstacles = [[2, 0], [3, 5], [7, 4]];
const rover2 = setupRover(0, 0, "NORTH");
const result2 = translateCommands(rover2, "L", obstacles);
console.log(roverReport(result2));  // Output: "(0, 0) WEST"

// Rover can move to negative coordinates
const rover3 = setupRover(0, 0, "SOUTH");
const result3 = translateCommands(rover3, "F");
console.log(roverReport(result3));  // Output: "(0, -1) SOUTH"
```

### Report Rover Status

```js
console.log(roverReport(result1));
console.log(roverReport(result2));
console.log(roverReport(result3));
```

---

## Commands

| Command | Description                |
|---------|----------------------------|
| F       | Move forward               |
| B       | Move backwards             |
| L       | Rotate left by 90°         |
| R       | Rotate right by 90°        |

---

## Running Tests

```bash
npm test
```

All Jest unit tests will run, including movements, rotations, obstacle detection, negative coordinates, and error handling.

---

## Notes

- Negative coordinates are valid (e.g., moving SOUTH from (0,0) gives (0,-1)).
- Obstacles are optional. Rover stops before hitting an obstacle and reports `STOPPED`.
- Invalid commands or directions will throw an error.
- CommonJS modules (`require/module.exports`) are used for simplicity.

---

## Author

Heba Eissa