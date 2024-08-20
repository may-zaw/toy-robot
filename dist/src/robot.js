var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["EAST"] = "EAST";
    Direction["SOUTH"] = "SOUTH";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
class Robot {
    constructor() {
        this.x = null;
        this.y = null;
        this.facing = null;
    }
    place(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
    }
    move() {
        if (this.x === null || this.y === null || this.facing === null)
            return;
        switch (this.facing) {
            case Direction.NORTH:
                this.y++;
                break;
            case Direction.SOUTH:
                this.y--;
                break;
            case Direction.EAST:
                this.x++;
                break;
            case Direction.WEST:
                this.x--;
                break;
        }
    }
    turnLeft() {
        if (this.facing === null)
            return;
        const directions = Object.keys(Direction);
        const currentIndex = directions.indexOf(this.facing);
        this.facing = directions[(currentIndex + 3) % 4];
    }
    turnRight() {
        if (this.facing === null)
            return;
        const directions = Object.keys(Direction);
        const currentIndex = directions.indexOf(this.facing);
        this.facing = directions[(currentIndex + 1) % 4];
    }
    report() {
        if (this.x === null || this.y === null || this.facing === null)
            return null;
        return `${this.x},${this.y},${this.facing}`;
    }
    getPosition() {
        return { x: this.x, y: this.y, facing: this.facing };
    }
}
//# sourceMappingURL=robot.js.map