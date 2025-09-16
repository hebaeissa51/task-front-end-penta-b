const { rotate, move, translateCommands, roverReport } = require('../src/rover.js');

describe('Unit tests for rotate & move actions', () => {
    let rover;

    beforeEach(() => {
        rover = { x: 0, y: 0, direction: "NORTH" };
    });

    test('rotate left from NORTH', () => {
        rotate(rover, "left");
        expect(rover.direction).toBe("WEST");
    });

    test('move forward from NORTH', () => {
        move(rover, "forward");
        expect(rover).toEqual({ x: 0, y: 1, direction: "NORTH" });
    });
});

describe('Unit tests for Part I', () => {
    test('translate command FLFFFRFLB', () => {
        const rover = { x: 4, y: 2, direction: "EAST" };
        translateCommands(rover, "FLFFFRFLB");
        expect(roverReport(rover)).toBe("(6, 4) NORTH");
    });

    test('command with rotate left', () => {
        const rover = { x: 0, y: 0, direction: "NORTH" };
        translateCommands(rover, "L"); 
        expect(roverReport(rover)).toBe("(0, 0) WEST");
    });

    test('command with backwards movement', () => {
        const rover = { x: 0, y: 0, direction: "EAST" };
        translateCommands(rover, "B"); 
        expect(roverReport(rover)).toBe("(-1, 0) EAST");
    });

    test('invalid command should throw error', () => {
        const rover = { x: 0, y: 0, direction: "NORTH" };
        expect(() => translateCommands(rover, "BRZ")).toThrow("Invalid command");
    });
});