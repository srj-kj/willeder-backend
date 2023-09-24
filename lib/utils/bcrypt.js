"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.comparePassword = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const exceptions_1 = require("../constants/exceptions");
const errorMessage_1 = require("../constants/errorMessage");
const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcryptjs_1.default.compare(password, hashedPassword);
    if (!isMatch)
        throw new exceptions_1.APIError(errorMessage_1.PASSWORD_NOT_MATCH, statusCode_1.default.FORBIDDEN);
    return isMatch;
};
exports.comparePassword = comparePassword;
const hashPassword = (password) => {
    try {
        const hash = bcryptjs_1.default.hash(password, 10);
        return hash;
    }
    catch (error) {
        throw new exceptions_1.APIError(error.toString(), statusCode_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=bcrypt.js.map