"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SCHEMA = exports.UPDATE_PASSWORD_SCHEMA = exports.FORGOT_PASSWORD_SCHEMA = exports.LOGIN_SCHEMA = exports.REGISTER_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.REGISTER_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL_NOT_EXIST)("body"),
    password: (0, validation_1.VALIDATION_PASSWORD)("body"),
    name: (0, validation_1.VALIDATION_STRING)("body"),
    phone: (0, validation_1.VALIDATION_ACCOUNT_TEL)("body"),
    address: (0, validation_1.VALIDATION_STRING)("body"),
};
exports.LOGIN_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL_EXIST)('body'),
    password: (0, validation_1.VALIDATION_PASSWORD_CHECK)('body'),
};
exports.FORGOT_PASSWORD_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL_EXIST)('body'),
};
exports.UPDATE_PASSWORD_SCHEMA = {
    password: (0, validation_1.VALIDATION_PASSWORD)('body'),
    tokenId: (0, validation_1.VALIDATION_TOKEN)('body'),
};
exports.REFRESH_TOKEN_SCHEMA = {
    refreshToken: (0, validation_1.VALIDATION_STRING)("body"),
};
//# sourceMappingURL=auth.validation.js.map