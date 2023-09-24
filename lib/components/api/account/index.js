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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
/* eslint-disable max-len */
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const account_validation_1 = require("./account.validation");
const controller = __importStar(require("./account.controller"));
const validation_1 = require("../../../utils/validation");
const router = express_1.default.Router();
router.put("/profile/edit", (0, express_validator_1.checkSchema)(account_validation_1.ACCOUNT_SCHEMA), validation_1.checkValidation, controller.updateAccount);
router.put("/password", (0, express_validator_1.checkSchema)(account_validation_1.ACCOUNT_PASSWORD_SCHEMA), validation_1.checkValidation, controller.updatePassword);
router.get("/profile", controller.getAccountInfo);
exports.default = router;
//# sourceMappingURL=index.js.map