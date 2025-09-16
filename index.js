const { translateCommands, roverReport, setupRover } = require('./src/rover.js');

const rover = setupRover(0, 0, "EAST");
const obstacles = [[2, 0]];
const result = translateCommands(rover, "FFR", obstacles);

console.log("Rover reports: ", roverReport(result));