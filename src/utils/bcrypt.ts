/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import bcrypt from "bcryptjs";
import HttpStatusCode from "../constants/statusCode";
import {APIError} from "../constants/exceptions";
import {PASSWORD_NOT_MATCH} from "../constants/errorMessage";

export const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) throw new APIError(PASSWORD_NOT_MATCH, HttpStatusCode.FORBIDDEN);
  return isMatch;
};

export const hashPassword = (password: string) => {
  try {
    const hash = bcrypt.hash(password, 10);
    return hash;
  } catch (error:any) {
    throw new APIError(error.toString(), HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
};
