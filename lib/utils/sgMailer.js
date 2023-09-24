"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MailDataRequired } from '@sendgrid/mail';
// import sgMail from '@sendgrid/mail';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
// sgMail.setApiKey(process.env.NODEMAILER_API_KEY || '');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_FROM_EMAIL,
        pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
});
const sendMessage = async (message) => {
    try {
        // TODO
        await transporter.sendMail(message);
        return Promise.resolve();
    }
    catch (err) {
        // TODO
        return Promise.reject(err);
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=sgMailer.js.map