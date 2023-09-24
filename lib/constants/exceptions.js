"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const statusCode_1 = __importDefault(require("./statusCode"));
class APIError extends Error {
    constructor(message, statusCode, name, operationErrorCode) {
        super(name);
        this.errorData = {};
        this.name = "APIError";
        this.message = message;
        this.statusCode = statusCode;
        this.operationErrorCode = operationErrorCode;
    }
    static Conflict(message) {
        return new APIError(message, statusCode_1.default.CONFLICT, "APIError::Conflict");
    }
    static BadRequest(message) {
        return new APIError(message, statusCode_1.default.BAD_REQUEST, "APIError::BadRequest");
    }
    static ServerError(message) {
        return new APIError(message, statusCode_1.default.INTERNAL_SERVER_ERROR, "APIError::ServerError");
    }
    static NotFound(message) {
        return new APIError(message, statusCode_1.default.NOT_FOUND, "APIError::NotFound");
    }
    static PaymentRequired(message) {
        return new APIError(message, statusCode_1.default.PAYMENT_REQUIRED, "APIError::PaymentRequired");
    }
    static AlreadyReported(message) {
        return new APIError(message, statusCode_1.default.ALREADY_REPORTED, "APIError::AlreadyReported");
    }
    static Unauthorized(message = "unauthorized") {
        return new APIError(message, statusCode_1.default.UNAUTHORIZED, "APIError::Unauthorized");
    }
    static Forbidden(message) {
        return new APIError(message, statusCode_1.default.FORBIDDEN, "APIError::Forbidden");
    }
    static NotImplemented() {
        return new APIError("request route and api not found or not implemented", statusCode_1.default.NOT_FOUND, "APIError::NotImplemented");
    }
}
exports.APIError = APIError;
//# sourceMappingURL=exceptions.js.map