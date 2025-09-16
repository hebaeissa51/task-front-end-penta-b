/********************** Constants *********************/
const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

const MOVES = {
    NORTH: { dx: 0, dy: 1 },   // y + 1
    EAST:  { dx: 1, dy: 0 },   // x + 1
    SOUTH: { dx: 0, dy: -1 },  // y - 1
    WEST:  { dx: -1, dy: 0 }   // x - 1
};

const ROTATION_STEPS = { right: 1, left: -1 };

const MOVE_STEPS = { forward: 1, backwards: -1 };

/********************** Rover setup *********************/
function setupRover(x, y, direction) {
    if (!DIRECTIONS.includes(direction)) {
        throw new Error(`Invalid direction: ${direction}`);
    }
    return { x, y, direction };
}

/********************** Rotate *********************/
function rotate(rover, rotationDir) {
    const step = ROTATION_STEPS[rotationDir];
    if (!step) throw new Error(`Invalid rotation direction: ${rotationDir}`);

    const currentIndex = DIRECTIONS.indexOf(rover.direction);
    const nextIndex = (currentIndex + step + DIRECTIONS.length) % DIRECTIONS.length;
    rover.direction = DIRECTIONS[nextIndex];
}

/********************** Move *********************/
function move(rover, moveDir, obstaclesSet) {
    const step = MOVE_STEPS[moveDir];
    if (step === undefined) throw new Error(`Invalid move direction: ${moveDir}`);

    const { dx, dy } = MOVES[rover.direction];
    const nextX = rover.x + dx * step;
    const nextY = rover.y + dy * step;

    if (obstaclesSet.has(`${nextX},${nextY}`)) {
        return false; 
    }
    rover.x = nextX;
    rover.y = nextY;
    return true; 
}

/********************** Translate Commands *********************/
function translateCommands(rover, commands, obstaclesArray = []) {
    const obstaclesSet = new Set(obstaclesArray.map(([x, y]) => `${x},${y}`));

    const commandActions = {
        F: (rover) => move(rover, "forward", obstaclesSet),
        B: (rover) => move(rover, "backwards", obstaclesSet),
        L: (rover) => { rotate(rover, "left"); return true; },
        R: (rover) => { rotate(rover, "right"); return true; }
    };

    for (const command of commands) {
        const action = commandActions[command];
        if (!action) throw new Error(`Invalid command: ${command}`);
        
        const moved = action(rover);
        if (!moved) {
            return { rover: { ...rover }, stopped: true };
        }
    }
    return { rover: { ...rover }, stopped: false };
}

/********************** Rover report *********************/
function roverReport(roverResult) {
    const { rover, stopped } = roverResult;
    const base = `(${rover.x}, ${rover.y}) ${rover.direction}`;
    return stopped ? `${base} STOPPED` : base;
}

/********************** Exports *********************/
module.exports = { translateCommands, roverReport, setupRover };