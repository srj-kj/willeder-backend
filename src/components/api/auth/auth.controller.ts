/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import {Request, Response, NextFunction} from "express";
import {logger} from "firebase-functions/v1";
import {decodeJwt, encodeJwt} from "../../../utils/jwt";
import * as service from "./auth.service";
import {getCurrentJST} from "../../../utils/dayjs";
import {
  badImplementationException,
  dataNotExistException,
  unauthorizedException,
} from "../../../utils/apiErrorHandler";
import {getUser, getUserByEmail, updateUser} from "../../../models/user";
import {comparePassword} from "../../../utils/bcrypt";

// import { getUser, getUserByEmail, updateUserFields } from '../../../models/user';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password, name, phone, address} = req.body;

    await service.createUser(email, password, name, phone, address);
    res.status(200).json( {
      message: "user registered successfully",
    });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const {user_id} = req.user;
    const {email, password} = req.body;
    // if (!user_id) throw badImplementationException("user_id is not set properly");

    const {ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN} = process.env;


    // TODO update refresh token
    // await updateUserFields();
    const user = await getUserByEmail(email);
    if (!user) throw dataNotExistException("Email does not register");
    const passwordCheck = await comparePassword(password, user.password);
    const accessToken = encodeJwt({id: user.user_id}, ACCESS_TOKEN_EXPIRED_IN || "1m", "access");
    const refreshToken = encodeJwt({id: user.user_id}, REFRESH_TOKEN_EXPIRED_IN || "2m", "refresh");
    const {docId, ...userWithoutDocId} = user;

    userWithoutDocId.refresh_token = refreshToken;

    await updateUser(docId, userWithoutDocId);

    res.status(200).json({accessToken, refreshToken});
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {user_id} = req.user;
    if (!user_id) throw badImplementationException("user_id is not set properly");

    // TODO updateUser for make the refresh token to be null


    const user = await getUser(user_id);
    if (!user) throw unauthorizedException("User is not exist");
    user.refresh_token="";
    await updateUser(user.docId, user);
    res.status(200).json();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email} = req.body;

    // TODO implment getUserByEmail to get user detail
    const user = await getUserByEmail(email);
    if (!user) throw dataNotExistException("Email does not register");
    if (user.status !== "active") throw unauthorizedException("This user is unauthorized.");

    service.forgotPassword(user);

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {password, tokenId} = req.body;

    await service.updatePassword(password, tokenId);

    res.status(200).json({
      message: "Password Changed successfully",
    });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {refreshToken} = req.body;

    const decoded:any = decodeJwt(refreshToken, "refresh");

    // TODO get user by id
    const user = await getUser(decoded.id);
    if (!user) throw unauthorizedException("User is not exist");
    if (user.status !== "active") throw unauthorizedException("This user is not active");
    if (user.refresh_token !== refreshToken) throw unauthorizedException("Refresh token is not valid");

    const {ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN} = process.env;

    const accessToken = encodeJwt({id: user.user_id}, ACCESS_TOKEN_EXPIRED_IN || "5m", "access");
    user.refresh_token = encodeJwt({id: user.user_id}, REFRESH_TOKEN_EXPIRED_IN || "30d", "refresh");

    // update refresh token
    await updateUser(user.docId, user);

    res.status(200).json({accessToken, refreshToken: user.refresh_token});
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};
