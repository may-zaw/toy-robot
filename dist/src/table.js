class Table {
    constructor(width = 5, height = 5) {
        this.width = width;
        this.height = height;
    }
    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
}
//# sourceMappingURL=table.js.map