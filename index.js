import { rotate, move } from "./src/rover.js";

const rover = { x: 0, y: 0, direction: "EAST" };

rotate(rover, "left"); 
move(rover, "backwards");    

console.log("Rover:", rover);