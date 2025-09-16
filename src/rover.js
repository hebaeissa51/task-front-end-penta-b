const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const movesByDirection = {
    NORTH: { dx: 0, dy: 1 },     // y + 1
    EAST: { dx: 1, dy: 0 },     // x + 1
    SOUTH: { dx: 0, dy: -1 },   // y - 1
    WEST: { dx: -1, dy: 0 }     // x - 1
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
function move(rover, moveDir, obstaclesSet) {
    if (!["forward", "backwards"].includes(moveDir)) {
        throw new Error(`Invalid move direction: ${moveDir}`);
    }

    const moveStep = moveDir === "forward" ? 1 : -1;
    const { dx, dy } = movesByDirection[rover.direction];

    const nextX = rover.x + dx * moveStep;
    const nextY = rover.y + dy * moveStep;

    if (obstaclesSet.has(`${nextX},${nextY}`)) {
        return { blocked: true };
    }
    rover.x = nextX;
    rover.y = nextY;
    return { blocked: false };
}

/**
 * 
 * @param {Object} rover: { x, y, direction }
 * @param {string} commands 
 * @returns new rover: { x, y, direction }
 */
function translateCommands(rover, commands, obstaclesArray = []) {
    const obstaclesSet = new Set(obstaclesArray.map(([x, y]) => `${x},${y}`));

    const commandActions = {
        F: (rover) => move(rover, "forward", obstaclesSet),
        B: (rover) => move(rover, "backwards", obstaclesSet),
        L: (rover) => { rotate(rover, "left"); return { blocked: false }; },
        R: (rover) => { rotate(rover, "right"); return { blocked: false }; }
    };

    for (const command of commands) {
        const action = commandActions[command];
        if (!action) throw new Error(`Invalid command: "${command}"`);
        const result = action(rover);
        if (result && result.blocked) {
            return { rover: { ...rover }, stopped: true };
        }
    }
    return { rover: { ...rover }, stopped: false };
}

function roverReport(roverResult) {
    const { rover, stopped } = roverResult;
    const base = `(${rover.x}, ${rover.y}) ${rover.direction}`;
    return stopped ? `${base} STOPPED` : base;
}


module.exports = { rotate, move, translateCommands, roverReport };