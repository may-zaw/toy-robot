"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simulator = void 0;
class Simulator {
    constructor() {
        this.robot = new Robot();
        this.table = new Table();
    }
    execute(command) {
        const parts = command.trim().toUpperCase().split(` `);
        const action = parts[0];
        if (action === `PLACE` && parts[1]) {
            const [x, y, facing] = this.parsePlaceCommand(parts[1]);
            if (this.table.isValidPosition(x, y)) {
                this.robot.place(x, y, facing);
            }
        }
        else if (action === `MOVE`) {
            if (this.canMove()) {
                this.robot.move();
            }
        }
        else if (action === `LEFT`) {
            this.robot.turnLeft();
        }
        else if (action === `RIGHT`) {
            this.robot.turnRight();
        }
        else if (action === `REPORT`) {
            const report = this.robot.report();
            if (report) {
                console.log(report);
            }
        }
    }
    canMove() {
        const { x, y, facing } = this.robot.getPosition();
        if (x === null || y === null || facing === null)
            return false;
        let newX = x;
        let newY = y;
        switch (facing) {
            case Direction.NORTH:
                newY++;
                break;
            case Direction.SOUTH:
                newY--;
                break;
            case Direction.EAST:
                newX++;
                break;
            case Direction.WEST:
                newX--;
                break;
        }
        return this.table.isValidPosition(newX, newY);
    }
    parsePlaceCommand(params) {
        const [x, y, facing] = params.split(`,`);
        return [parseInt(x), parseInt(y), facing];
    }
}
exports.Simulator = Simulator;
//# sourceMappingURL=simulator.js.map