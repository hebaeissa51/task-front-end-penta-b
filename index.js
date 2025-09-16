const { translateCommands, roverReport } = require('./src/rover.js');

const rover = { x: 4, y: 2, direction: "EAST" };
const currentRover = translateCommands(rover, "FLFFFRFLB");

console.log("Rover reports: ", roverReport(currentRover));