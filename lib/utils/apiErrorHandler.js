"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.badImplementationException = exports.dataConflictException = exports.unauthorizedException = exports.userNotActivateException = exports.dataNotExistException = exports.invalidException = exports.validationException = exports.HttpException = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const v1_1 = require("firebase-functions/v1");
const ERROR = __importStar(require("../constants/errorMessage"));
class HttpException extends Error {
    constructor(statusCode, messages, subStatusCode) {
        super(messages[0]);
        this.statusCode = statusCode || 500;
        this.message = messages[0];
        this.errorMessage = messages;
        this.subStatusCode = subStatusCode;
    }
}
exports.HttpException = HttpException;
const validationException = (errors) => {
    errors && v1_1.logger.warn(errors);
    return new HttpException(400, errors[0].type === "field" ? `${errors[0].msg}, Field Name: ${errors[0].path}` : errors[0].msg, 1001);
};
exports.validationException = validationException;
const invalidException = (error) => {
    error ? v1_1.logger.warn(error) : v1_1.logger.warn(ERROR.DATANOTFOUND);
    return new HttpException(400, error || ERROR.DATANOTFOUND, 1001);
};
exports.invalidException = invalidException;
const dataNotExistException = (error) => {
    error ? v1_1.logger.warn(error) : v1_1.logger.warn(ERROR.DATANOTFOUND);
    return new HttpException(400, error || ERROR.DATANOTFOUND, 1002);
};
exports.dataNotExistException = dataNotExistException;
const userNotActivateException = (error) => {
    error ? v1_1.logger.warn(error) : v1_1.logger.warn(ERROR.USERNOTACTIVATE);
    return new HttpException(400, error || ERROR.USERNOTACTIVATE, 1003);
};
exports.userNotActivateException = userNotActivateException;
const unauthorizedException = (error) => {
    error ? v1_1.logger.warn(error) : v1_1.logger.warn(ERROR.UNAUTH);
    return new HttpException(401, error || ERROR.UNAUTH, 2001);
};
exports.unauthorizedException = unauthorizedException;
const dataConflictException = (error) => {
    error ? v1_1.logger.warn(error) : v1_1.logger.warn(ERROR.CONFLICT);
    return new HttpException(409, error || ERROR.CONFLICT, 3001);
};
exports.dataConflictException = dataConflictException;
const badImplementationException = (error) => {
    error ? v1_1.logger.error(error) : v1_1.logger.error(ERROR.BADIMPLEMENTATION);
    return new HttpException(500, error || ERROR.BADIMPLEMENTATION, 5000);
};
exports.badImplementationException = badImplementationException;
//# sourceMappingURL=apiErrorHandler.js.map