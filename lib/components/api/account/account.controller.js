"use strict";
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
exports.getAccountInfo = exports.updatePassword = exports.updateAccount = void 0;
const user_1 = require("../../../models/user");
const account_service_1 = require("./account.service");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const updateAccount = async (req, res, next) => {
    let user_id = req.user.user_id;
    if (!user_id)
        throw (0, apiErrorHandler_1.badImplementationException)("user_id is not set properly");
    (0, account_service_1.updateAccountService)(user_id, req.body);
    res.status(200).json({
        message: 'Details Updated successfully',
    });
};
exports.updateAccount = updateAccount;
const updatePassword = async (req, res, next) => {
    let user_id = req.user.user_id;
    if (!user_id)
        throw (0, apiErrorHandler_1.badImplementationException)("user_id is not set properly");
    (0, account_service_1.updatePasswordService)(user_id, req.body);
    res.status(200).json({
        message: 'Password Changed successfully',
    });
};
exports.updatePassword = updatePassword;
const getAccountInfo = async (req, res, next) => {
    let user_id = req.user.user_id;
    if (!user_id)
        throw (0, apiErrorHandler_1.badImplementationException)("user_id is not set properly");
    let user = await (0, user_1.getUser)(user_id);
    if (!user)
        throw (0, apiErrorHandler_1.unauthorizedException)('User is not exist');
    let { docId, password } = user, result = __rest(user, ["docId", "password"]);
    res.status(200).json(result);
};
exports.getAccountInfo = getAccountInfo;
//# sourceMappingURL=account.controller.js.map