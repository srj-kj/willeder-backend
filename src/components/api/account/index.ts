/* eslint-disable new-cap */
/* eslint-disable max-len */
import express from "express";
import {checkSchema} from "express-validator";

import {ACCOUNT_PASSWORD_SCHEMA, ACCOUNT_SCHEMA} from "./account.validation";

import * as controller from "./account.controller";
import {checkValidation} from "../../../utils/validation";

const router = express.Router();

router.put("/profile/edit", checkSchema(ACCOUNT_SCHEMA), checkValidation, controller.updateAccount);
router.put("/password", checkSchema(ACCOUNT_PASSWORD_SCHEMA), checkValidation, controller.updatePassword);
router.get("/profile", controller.getAccountInfo);

export default router;
