"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const account_1 = __importDefault(require("./account"));
const auth_2 = require("../../utils/auth");
const router = express_1.default.Router();
router.use("/auth", auth_1.default);
router.use("/account", auth_2.isAuth, account_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map