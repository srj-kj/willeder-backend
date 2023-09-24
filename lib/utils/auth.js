"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const apiErrorHandler_1 = require("./apiErrorHandler");
const v1_1 = require("firebase-functions/v1");
const jwt_1 = require("./jwt");
// eslint-disable-next-line max-len
const isAuth = async (req, res, next) => {
    try {
        const bearer = req.headers["authorization"];
        if (!bearer)
            throw (0, apiErrorHandler_1.unauthorizedException)("No token provided");
        // TODO
        let token = "";
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        const jwtToken = await (0, jwt_1.decodeJwt)(token, "access");
        req.user = { user_id: jwtToken.id, name: "" };
        next();
    }
    catch (err) {
        v1_1.logger.warn(err);
        next(err);
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map