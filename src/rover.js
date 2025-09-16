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
function move(rover, moveDir) {
    if (!["forward", "backwards"].includes(moveDir)) {
        throw new Error(`Invalid move direction: ${moveDir}`);
    }

    const moveStep = moveDir === "forward" ? 1 : -1;
    const { dx, dy } = movesByDirection[rover.direction];
    rover.x += dx * moveStep;
    rover.y += dy * moveStep;
}

module.exports = { rotate, move };