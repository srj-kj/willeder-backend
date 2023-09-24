"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_PASSWORD_CHECK = exports.VALIDATION_EMAIL_EXIST = exports.VALIDATION_ACCOUNT_TEL = exports.VALIDATION_PASSWORD = exports.VALIDATION_EMAIL_NOT_EXIST = exports.VALIDATION_TOKEN = exports.VALIDATION_STRING = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
const express_validator_1 = require("express-validator");
const regexp_1 = require("./regexp");
const VALIDATION_STRING = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_STRING = VALIDATION_STRING;
const VALIDATION_TOKEN = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_TOKEN = VALIDATION_TOKEN;
const VALIDATION_EMAIL_NOT_EXIST = (where) => ({
    in: [where],
    isEmail: true,
    normalizeEmail: true,
    trim: true,
});
exports.VALIDATION_EMAIL_NOT_EXIST = VALIDATION_EMAIL_NOT_EXIST;
const validatePassword = (regex) => {
    return (0, express_validator_1.check)().custom((value) => {
        if (!regex.test(value)) {
            throw new Error("Invalid password format");
        }
        return true;
    });
};
const VALIDATION_PASSWORD = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: 8 },
    },
    custom: validatePassword(regexp_1.REGEXP_PASSWORD),
});
exports.VALIDATION_PASSWORD = VALIDATION_PASSWORD;
const VALIDATION_ACCOUNT_TEL = (where) => ({
    in: [where],
    isLength: {
        options: { min: 10 },
    },
});
exports.VALIDATION_ACCOUNT_TEL = VALIDATION_ACCOUNT_TEL;
const VALIDATION_EMAIL_EXIST = (where) => ({
    in: [where],
    isEmail: true,
    normalizeEmail: true,
    trim: true,
});
exports.VALIDATION_EMAIL_EXIST = VALIDATION_EMAIL_EXIST;
const VALIDATION_PASSWORD_CHECK = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: 8 },
    },
    custom: validatePassword(regexp_1.REGEXP_PASSWORD),
});
exports.VALIDATION_PASSWORD_CHECK = VALIDATION_PASSWORD_CHECK;
//# sourceMappingURL=validation.js.map