/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MailDataRequired } from '@sendgrid/mail';
// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.NODEMAILER_API_KEY || '');
import dotnev from "dotenv";
dotnev.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_FROM_EMAIL,
    pass: process.env.NODEMAILER_MAIL_PASSWORD,
  },
});


export const sendMessage = async (message:any) => {
  try {
    // TODO


    await transporter.sendMail(message);

    return Promise.resolve();
  } catch (err) {
    // TODO
    return Promise.reject(err);
  }
};
