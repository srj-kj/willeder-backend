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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.updatePassword = exports.forgotPassword = exports.logout = exports.login = exports.register = void 0;
const v1_1 = require("firebase-functions/v1");
const jwt_1 = require("../../../utils/jwt");
const service = __importStar(require("./auth.service"));
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const user_1 = require("../../../models/user");
const bcrypt_1 = require("../../../utils/bcrypt");
// import { getUser, getUserByEmail, updateUserFields } from '../../../models/user';
const register = async (req, res, next) => {
    try {
        const { email, password, name, phone, address } = req.body;
        await service.createUser(email, password, name, phone, address);
        res.status(200).json({
            message: "user registered successfully",
        });
    }
    catch (err) {
        v1_1.logger.error(err);
        next(err);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        // const {user_id} = req.user;
        const { email, password } = req.body;
        // if (!user_id) throw badImplementationException("user_id is not set properly");
        const { ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN } = process.env;
        // TODO update refresh token
        // await updateUserFields();
        const user = await (0, user_1.getUserByEmail)(email);
        if (!user)
            throw (0, apiErrorHandler_1.dataNotExistException)("Email does not register");
        const passwordCheck = await (0, bcrypt_1.comparePassword)(password, user.password);
        const accessToken = (0, jwt_1.encodeJwt)({ id: user.user_id }, ACCESS_TOKEN_EXPIRED_IN || "1m", "access");
        const refreshToken = (0, jwt_1.encodeJwt)({ id: user.user_id }, REFRESH_TOKEN_EXPIRED_IN || "2m", "refresh");
        const { docId } = user, userWithoutDocId = __rest(user, ["docId"]);
        userWithoutDocId.refresh_token = refreshToken;
        await (0, user_1.updateUser)(docId, userWithoutDocId);
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (err) {
        v1_1.logger.error(err);
        next(err);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        const { user_id } = req.user;
        if (!user_id)
            throw (0, apiErrorHandler_1.badImplementationException)("user_id is not set properly");
        // TODO updateUser for make the refresh token to be null
        const user = await (0, user_1.getUser)(user_id);
        if (!user)
            throw (0, apiErrorHandler_1.unauthorizedException)("User is not exist");
        user.refresh_token = "";
        await (0, user_1.updateUser)(user.docId, user);
        res.status(200).json();
    }
    catch (err) {
        v1_1.logger.error(err);
        next(err);
    }
};
exports.logout = logout;
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        // TODO implment getUserByEmail to get user detail
        const user = await (0, user_1.getUserByEmail)(email);
        if (!user)
            throw (0, apiErrorHandler_1.dataNotExistException)("Email does not register");
        if (user.status !== "active")
            throw (0, apiErrorHandler_1.unauthorizedException)("This user is unauthorized.");
        service.forgotPassword(user);
        res.status(200).json({
            message: "Email sent successfully",
        });
    }
    catch (err) {
        v1_1.logger.error(err);
        next(err);
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (req, res, next) => {
    try {
        const { password, tokenId } = req.body;
        await service.updatePassword(password, tokenId);
        res.status(200).json({
            message: "Password Changed successfully",
        });
    }
    catch (err) {
        v1_1.logger.error(err);
        next(err);
    }
};
exports.updatePassword = updatePassword;
const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const decoded = (0, jwt_1.decodeJwt)(refreshToken, "refresh");
        // TODO get user by id
        const user = await (0, user_1.getUser)(decoded.id);
        if (!user)
            throw (0, apiErrorHandler_1.unauthorizedException)("User is not exist");
        if (user.status !== "active")
            throw (0, apiErrorHandler_1.unauthorizedException)("This user is not active");
        if (user.refresh_token !== refreshToken)
            throw (0, apiErrorHandler_1.unauthorizedException)("Refresh token is not valid");
        const { ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN } = process.env;
        const accessToken = (0, jwt_1.encodeJwt)({ id: user.user_id }, ACCESS_TOKEN_EXPIRED_IN || "5m", "access");
        user.refresh_token = (0, jwt_1.encodeJwt)({ id: user.user_id }, REFRESH_TOKEN_EXPIRED_IN || "30d", "refresh");
        // update refresh token
        await (0, user_1.updateUser)(user.docId, user);
        res.status(200).json({ accessToken, refreshToken: user.refresh_token });
    }
    catch (err) {
        v1_1.logger.error(err);
        next(err);
    }
};
exports.refresh = refresh;
//# sourceMappingURL=auth.controller.js.map