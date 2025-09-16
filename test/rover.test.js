const { translateCommands, roverReport } = require('../src/rover.js');

describe('Unit tests for Part II', () => {
    test('translate command FLFFFRFLB without obstacles', () => {
        const rover = { x: 4, y: 2, direction: "EAST" };
        const result = translateCommands(rover, "FLFFFRFLB");

        expect(result.stopped).toBe(false);
        expect(roverReport(result)).toBe("(6, 4) NORTH");
    });

    test('command with rotate left', () => {
        const rover = { x: 0, y: 0, direction: "NORTH" };
        const obstacles = [[1, 4], [3, 5], [7, 4]];
        const result = translateCommands(rover, "L", obstacles);

        expect(result.stopped).toBe(false);
        expect(roverReport(result)).toBe("(0, 0) WEST");
    });

    test('should stop before an obstacle and report STOPPED', () => {
        const rover = { x: 0, y: 0, direction: "EAST" };
        const obstacles = [[2, 0]];

        const result = translateCommands(rover, "FFR", obstacles);

        expect(result.stopped).toBe(true);
        expect(result.rover).toEqual({ x: 1, y: 0, direction: "EAST" });
        expect(roverReport(result)).toBe("(1, 0) EAST STOPPED");
    });

    test('invalid command should throw error', () => {
        const rover = { x: 0, y: 0, direction: "NORTH" };
        expect(() => translateCommands(rover, "BRZ")).toThrow("Invalid command");
    });
});