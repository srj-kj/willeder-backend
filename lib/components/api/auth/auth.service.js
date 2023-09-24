"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = exports.createUser = void 0;
/* eslint-disable new-cap */
/* eslint-disable max-len */
const v1_1 = require("firebase-functions/v1");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const sgMailer_1 = require("../../../utils/sgMailer");
const bcrypt_1 = require("../../../utils/bcrypt");
const uuid_1 = require("uuid");
const dayjs_1 = require("../../../utils/dayjs");
const token_1 = require("../../../models/token");
const auth_message_1 = require("./auth.message");
const user_1 = require("../../../models/user");
const statusCode_1 = __importDefault(require("../../../constants/statusCode"));
const exceptions_1 = require("../../../constants/exceptions");
const errorMessage_1 = require("../../../constants/errorMessage");
const createUser = async (email, password, name, phone, address) => {
    // TODO
    const user = await (0, user_1.getUserByEmail)(email);
    if (user)
        throw new exceptions_1.APIError(errorMessage_1.EMAIL_ALREADY_EXIST, statusCode_1.default.CONFLICT);
    const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
    const userCreationDocument = {
        user_id: (0, uuid_1.v4)(),
        email: email,
        password: hashedPassword,
        name: name,
        phone: phone,
        address: address,
        status: "active",
        created_at: (0, dayjs_1.getCurrentJST)(),
        updated_at: "",
        deleted_at: "",
        refresh_token: "",
    };
    await (0, user_1.addUser)(userCreationDocument);
    return;
};
exports.createUser = createUser;
const forgotPassword = async (user) => {
    let error;
    try {
        const newToken = {
            token_id: (0, uuid_1.v4)(),
            user_id: user.docId,
            token_type: "resetPassword",
            user_type: "user",
            created_at: (0, dayjs_1.getCurrentJST)(),
            expired_at: (0, dayjs_1.getAddToCurrentJST)(1, "h"),
        };
        await (0, token_1.addToken)(newToken);
        const tokenUrl = process.env.FRONTEND_URL + "/auth/password/reset/" + newToken.token_id;
        await (0, sgMailer_1.sendMessage)((0, auth_message_1.MESSAGE_RESET_PASSWORD)(user.email, tokenUrl));
        return Promise.resolve("success");
    }
    catch (err) {
        v1_1.logger.error(err);
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        return Promise.reject(error);
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (password, tokenId) => {
    let error;
    try {
        const token = await (0, token_1.getToken)(tokenId);
        if (!token)
            throw (0, apiErrorHandler_1.dataNotExistException)("Token does not exist");
        if (token.user_type !== "user")
            throw (0, apiErrorHandler_1.invalidException)("Token is not valid user type");
        if (token.token_type !== "resetPassword")
            throw (0, apiErrorHandler_1.invalidException)("Token is not valid token type");
        // TODO
        const user = await (0, user_1.getUser)(token.user_id);
        if (!user)
            throw (0, apiErrorHandler_1.unauthorizedException)("User is not exist");
        user.password = await (0, bcrypt_1.hashPassword)(password);
        user.updated_at = (0, dayjs_1.getCurrentJST)();
        await (0, user_1.updateUser)(token.user_id, user);
        await (0, token_1.deleteToken)(tokenId);
        return Promise.resolve();
    }
    catch (err) {
        console.log(err);
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        return Promise.reject(error);
    }
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=auth.service.js.map