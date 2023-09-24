/* eslint-disable new-cap */
/* eslint-disable max-len */
import {logger} from "firebase-functions/v1";
import {
  badImplementationException,
  dataConflictException,
  dataNotExistException,
  HttpException,
  invalidException,
  unauthorizedException,
} from "../../../utils/apiErrorHandler";
import {sendMessage} from "../../../utils/sgMailer";
import {hashPassword} from "../../../utils/bcrypt";
import {v4 as uuidv4} from "uuid";
import {getAddToCurrentJST, getCurrentJST} from "../../../utils/dayjs";
import {TokenDocument} from "../../../models/token/token.entity";
import {addToken, deleteToken, getToken} from "../../../models/token";
import {MESSAGE_RESET_PASSWORD} from "./auth.message";
import {addUser, getUser, getUserByEmail, updateUser} from "../../../models/user";
import {UserDocument, UserDocumentWithDocId} from "../../../models/user/user.entity";
import HttpStatusCode from "../../../constants/statusCode";
import {APIError} from "../../../constants/exceptions";
import {EMAIL_ALREADY_EXIST} from "../../../constants/errorMessage";

export const createUser = async (email: string, password: string, name: string, phone: string, address: string) => {
  // TODO

  const user = await getUserByEmail(email);
  if (user) throw new APIError(EMAIL_ALREADY_EXIST, HttpStatusCode.CONFLICT);

  const hashedPassword = await hashPassword(password);

  const userCreationDocument: UserDocument = {
    user_id: uuidv4(),
    email: email,
    password: hashedPassword,
    name: name,
    phone: phone,
    address: address,
    status: "active",
    created_at: getCurrentJST(),
    updated_at: "",
    deleted_at: "",
    refresh_token: "",
  };

  await addUser(userCreationDocument);

  return;
};


export const forgotPassword = async (user: UserDocumentWithDocId) => {
  let error: Error | HttpException | undefined;
  try {
    const newToken: TokenDocument = {
      token_id: uuidv4(),
      user_id: user.docId,
      token_type: "resetPassword",
      user_type: "user",
      created_at: getCurrentJST(),
      expired_at: getAddToCurrentJST(1, "h"),
    };

    await addToken(newToken);

    const tokenUrl = process.env.FRONTEND_URL + "/auth/password/reset/" + newToken.token_id;

    await sendMessage(MESSAGE_RESET_PASSWORD(user.email, tokenUrl));

    return Promise.resolve("success");
  } catch (err) {
    logger.error(err);
    error = err instanceof Error ? err : badImplementationException(err);
    return Promise.reject(error);
  }
};

export const updatePassword = async (password: string, tokenId: string) => {
  let error: Error | HttpException | undefined;
  try {
    const token = await getToken(tokenId);
    if (!token) throw dataNotExistException("Token does not exist");
    if (token.user_type !== "user") throw invalidException("Token is not valid user type");
    if (token.token_type !== "resetPassword") throw invalidException("Token is not valid token type");

    // TODO
    const user = await getUser(token.user_id);
    if (!user) throw unauthorizedException("User is not exist");
    user.password= await hashPassword(password);
    user.updated_at= getCurrentJST();


    await updateUser(token.user_id, user );

    await deleteToken(tokenId);

    return Promise.resolve();
  } catch (err) {
    console.log(err);
    error = err instanceof Error ? err : badImplementationException(err);
    return Promise.reject(error);
  }
};
