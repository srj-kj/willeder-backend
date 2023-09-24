"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const router = express_1.default.Router();
router.use("/", api_1.default);
exports.default = router;
//# sourceMappingURL=components.js.map