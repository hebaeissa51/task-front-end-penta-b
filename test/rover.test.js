const { rotate, move } = require('../src/rover.js');

describe('Test Rotation', () => {
    let rover;

    beforeEach(() => {
        rover = { x: 0, y: 0, direction: "NORTH" };
    });

    test('rotate right', () => {
        rotate(rover, 'right');
        expect(rover.direction).toBe('EAST');
    });

    test('rotate left', () => {
        rotate(rover, 'left');
        expect(rover.direction).toBe('WEST');
    });

    test('multiple rotation', () => {
        rotate(rover, 'left');
        rotate(rover, 'left');
        rotate(rover, 'right');
        rotate(rover, 'left');
        expect(rover.direction).toBe('SOUTH');
    });
});

describe('Test Movement', () => {
    test('Move forward', () => {
        const rover = { x: 0, y: 0, direction: "NORTH" };
        move(rover, 'forward');
        expect(rover).toEqual({ x: 0, y: 1, direction: "NORTH" });
    });

    test('Move backwards', () => {
        const rover = { x: 0, y: 0, direction: "NORTH" };
        move(rover, 'backwards');
        expect(rover).toEqual({ x: 0, y: -1, direction: "NORTH" });
    });
});

test('Test Movement with Rotation', () => {
    const rover = { x: 2, y: 3, direction: "NORTH" };
    move(rover, 'forward');
    rotate(rover, 'left');
    move(rover, 'forward');
    expect(rover).toEqual({ x: 1, y: 4, direction: "WEST" });
});