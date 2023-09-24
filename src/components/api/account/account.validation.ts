/* eslint-disable new-cap */
/* eslint-disable max-len */
import {Schema} from "express-validator";
import {VALIDATION_ACCOUNT_TEL, VALIDATION_EMAIL_EXIST, VALIDATION_PASSWORD_CHECK, VALIDATION_STRING} from "../../../constants/validation";

export const ACCOUNT_SCHEMA: Schema = {
  email: VALIDATION_EMAIL_EXIST("body"),
  address: VALIDATION_STRING("body"),
  phone: VALIDATION_ACCOUNT_TEL("body"),
};

export const ACCOUNT_PASSWORD_SCHEMA: Schema = {
  email: VALIDATION_EMAIL_EXIST("body"),
  password: VALIDATION_PASSWORD_CHECK("body"),
  newPassword: VALIDATION_PASSWORD_CHECK("body"),
};
