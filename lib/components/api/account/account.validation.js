"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_PASSWORD_SCHEMA = exports.ACCOUNT_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ACCOUNT_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL_EXIST)("body"),
    address: (0, validation_1.VALIDATION_STRING)("body"),
    phone: (0, validation_1.VALIDATION_ACCOUNT_TEL)("body"),
};
exports.ACCOUNT_PASSWORD_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL_EXIST)("body"),
    password: (0, validation_1.VALIDATION_PASSWORD_CHECK)("body"),
    newPassword: (0, validation_1.VALIDATION_PASSWORD_CHECK)("body"),
};
//# sourceMappingURL=account.validation.js.map