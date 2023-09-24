"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = exports.encodeJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const apiErrorHandler_1 = require("./apiErrorHandler");
const encodeJwt = (payload, expiresIn, secret = 'default') => {
    try {
        const SECRET = secret === 'refresh'
            ? process.env.JWT_REFRESH_SECRET
            : secret === 'access'
                ? process.env.JWT_ACCESS_SECRET
                : process.env.JWT_SECRET;
        if (!SECRET)
            throw (0, apiErrorHandler_1.badImplementationException)('SECRET is not defined on env file');
        // TODO
        const token = (0, jsonwebtoken_1.sign)(payload, SECRET, { expiresIn });
        return token;
    }
    catch (err) {
        throw err;
    }
};
exports.encodeJwt = encodeJwt;
const decodeJwt = (jwtoken, secret = 'default') => {
    try {
        const SECRET = secret === 'refresh'
            ? process.env.JWT_REFRESH_SECRET
            : secret === 'access'
                ? process.env.JWT_ACCESS_SECRET
                : process.env.JWT_SECRET;
        if (!SECRET)
            throw (0, apiErrorHandler_1.badImplementationException)('SECRET is not defined on env file');
        // TODO
        const decoded = (0, jsonwebtoken_1.verify)(jwtoken, SECRET);
        return decoded;
    }
    catch (err) {
        throw err;
    }
};
exports.decodeJwt = decodeJwt;
//# sourceMappingURL=jwt.js.map