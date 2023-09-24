"use strict";
/* eslint-disable max-len */
/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordService = exports.updateAccountService = void 0;
const user_1 = require("../../../models/user");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const bcrypt_1 = require("../../../utils/bcrypt");
const updateAccountService = async (user_id, data) => {
    // TODO
    const user = await (0, user_1.getUser)(user_id);
    if (!user)
        throw (0, apiErrorHandler_1.unauthorizedException)("User is not exist");
    await (0, user_1.updateUser)(user.docId, data);
    return;
};
exports.updateAccountService = updateAccountService;
const updatePasswordService = async (user_id, data) => {
    // TODO
    const { password, newPassword } = data;
    const user = await (0, user_1.getUser)(user_id);
    if (!user)
        throw (0, apiErrorHandler_1.unauthorizedException)("User is not exist");
    await (0, bcrypt_1.comparePassword)(password, user.password);
    user.password = await (0, bcrypt_1.hashPassword)(newPassword);
    await (0, user_1.updateUser)(user.docId, user);
    return;
};
exports.updatePasswordService = updatePasswordService;
//# sourceMappingURL=account.service.js.map