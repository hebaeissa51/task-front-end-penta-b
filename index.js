const { translateCommands, roverReport } = require('./src/rover.js');

const rover = { x: 0, y: 0, direction: "EAST" };
const obstacles = [[2, 0]];
const result = translateCommands(rover, "FFR", obstacles);

console.log("Rover reports: ", roverReport(result));