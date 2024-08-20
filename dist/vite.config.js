"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        globals: true,
        exclude: [],
        include: [`app/**/__tests__/*.spec.{ts,tsx}`],
    },
});
//# sourceMappingURL=vite.config.js.map