const { translateCommands, roverReport, setupRover } = require('../src/rover.js');

describe('Unit tests for Part II', () => {
    test('translate command FLFFFRFLB without obstacles', () => {
        const rover = setupRover(4, 2, "EAST");
        const result = translateCommands(rover, "FLFFFRFLB");

        expect(roverReport(result)).toBe("(6, 4) NORTH");
    });

    test('command with rotate left', () => {
        const rover = setupRover(0, 0, "NORTH");
        const obstacles = [[1, 4], [3, 5], [7, 4]];
        const result = translateCommands(rover, "L", obstacles);

        expect(roverReport(result)).toBe("(0, 0) WEST");
    });

    test('rover can move to negative coordinates', () => {
        const rover = setupRover(0, 0, "SOUTH");
        const result = translateCommands(rover, "F");
        expect(roverReport(result)).toBe("(0, -1) SOUTH");
    });

    test('should stop before an obstacle and report STOPPED', () => {
        const rover = setupRover(0, 0, "EAST");
        const obstacles = [[2, 0]];
        const result = translateCommands(rover, "FFR", obstacles);

        expect(result.rover).toEqual({ x: 1, y: 0, direction: "EAST" });
        expect(roverReport(result)).toBe("(1, 0) EAST STOPPED");
    });

    test('invalid command should throw error', () => {
        const rover = setupRover(0, 0, "NORTH");
        expect(() => translateCommands(rover, "BRZ")).toThrow("Invalid command: Z");
    });

    test('invalid direction should throws error', () => {
        expect(() => setupRover(0, 0, 'UP')).toThrow('Invalid direction: UP');
    });
});