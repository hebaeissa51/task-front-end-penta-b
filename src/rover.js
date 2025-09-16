const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const movesByDirection = {
    NORTH: { dx: 0, dy: 1 },     // y + 1
    EAST: { dx: 1, dy: 0 },     // x + 1
    SOUTH: { dx: 0, dy: -1 },   // y - 1
    WEST: { dx: -1, dy: 0 }     // x - 1
};

const commandActions = {
    F: (rover) => move(rover, "forward"),
    B: (rover) => move(rover, "backwards"),
    L: (rover) => rotate(rover, "left"),
    R: (rover) => rotate(rover, "right")
};


/**
 * Rotate right or left by 90 degrees
 * @param {Object} rover: { x, y, direction } 
 * @param {string} rotation: right or left
 */
function rotate(rover, rotationDir) {
    if (!["left", "right"].includes(rotationDir)) {
        throw new Error(`Invalid rotation direction: ${rotationDir}`);
    }

    const directionStep = rotationDir === "right" ? 1 : -1;
    const currentIndex = directions.indexOf(rover.direction);
    const nextIndex = (currentIndex + directionStep + directions.length) % directions.length;
    rover.direction = directions[nextIndex];
}

/**
 *  Move forward or backwards on current heading
 * @param {Object} rover: { x, y, direction }
 * @param {string} moveStep: forward or backwards
 */
function move(rover, moveDir) {
    if (!["forward", "backwards"].includes(moveDir)) {
        throw new Error(`Invalid move direction: ${moveDir}`);
    }

    const moveStep = moveDir === "forward" ? 1 : -1;
    const { dx, dy } = movesByDirection[rover.direction];
    rover.x += dx * moveStep;
    rover.y += dy * moveStep;
}

/**
 * 
 * @param {Object} rover: { x, y, direction }
 * @param {string} commands 
 * @returns new rover: { x, y, direction }
 */
function translateCommands(rover, commands) {
    for (const command of commands) {
        const action = commandActions[command];
        if (!action) throw new Error(`Invalid command: "${command}"`);
        action(rover);
    }
    return rover;
}

function roverReport(rover) {
    return `(${rover.x}, ${rover.y}) ${rover.direction}`;
}


module.exports = { rotate, move, translateCommands, roverReport };