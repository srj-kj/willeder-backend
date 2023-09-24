"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerComponents = void 0;
const components_1 = __importDefault(require("./components"));
const registerComponents = (app) => {
    app.use("/", components_1.default);
};
exports.registerComponents = registerComponents;
//# sourceMappingURL=index.js.map