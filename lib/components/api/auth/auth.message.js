"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_RESET_PASSWORD = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MESSAGE_RESET_PASSWORD = (email, tokenUrl) => ({
    to: email,
    from: process.env.NODEMAILER_FROM_EMAIL || "",
    subject: `【${process.env.APP_TITLE}】Password reset request was received`,
    html: `<p>Click below link fo rest your password.</p>
    <a href="${tokenUrl}"> Password Reset Link </a>`,
});
exports.MESSAGE_RESET_PASSWORD = MESSAGE_RESET_PASSWORD;
//# sourceMappingURL=auth.message.js.map