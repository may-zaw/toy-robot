import { Simulator } from './Simulator';

test('Robot should move and report correct position', () => {
    const simulator = new Simulator();
    simulator.execute('PLACE 0,0,NORTH');
    simulator.execute('MOVE');
    const output = simulator.robot.report();
    expect(output).toBe('0,1,NORTH');
})

test('Robot should turn left correctly', () => {
    const simulator = new Simulator();
    simulator.execute('PLACE 0,0,NORTH');
    simulator.execute('LEFT');
    const output = simulator.robot.report();
    expect(output).toBe('0,0,WEST');
})

test('Robot should handle edge cases without falling off the table', () => {
    const simulator = new Simulator();
    simulator.execute('PLACE 4,4,EAST');
    simulator.execute('MOVE');
    const output = simulator.robot.report();
    expect(output).toBe('4,4,EAST');  // The robot should not move beyond the table
})