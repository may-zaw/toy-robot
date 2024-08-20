"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simulator_1 = require("./simulator");
const simulator = new simulator_1.Simulator();
process.stdin.on(`data`, (input) => {
    const command = input.toString().trim();
    if (command === `EXIT`) {
        process.exit();
    }
    else {
        simulator.execute(command);
    }
});
console.log(`Toy Robot Simulator started. Enter commands or type 'EXIT' to quit.`);
//# sourceMappingURL=index.js.map