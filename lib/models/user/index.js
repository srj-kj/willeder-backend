"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUser = exports.updateUser = exports.addUser = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
// TODO
const firebase_1 = require("../../utils/firebase");
const user_entity_1 = require("./user.entity");
const exceptions_1 = require("../../constants/exceptions");
const statusCode_1 = __importDefault(require("../../constants/statusCode"));
const dayjs_1 = require("../../utils/dayjs");
const addUser = async (user) => {
    try {
        const entry = firebase_1.db.collection(user_entity_1.USER_COLLECTION_KEY).doc();
        await entry.set(user);
        return true;
    }
    catch (err) {
        throw new exceptions_1.APIError("Something went wrong", statusCode_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.addUser = addUser;
const updateUser = async (id, data) => {
    try {
        const entry = firebase_1.db.collection(user_entity_1.USER_COLLECTION_KEY).doc(id);
        data.updated_at = (0, dayjs_1.getCurrentJST)();
        await entry.update(data);
        return true;
    }
    catch (err) {
        console.log(err);
        throw new exceptions_1.APIError("Something went wrong", statusCode_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.updateUser = updateUser;
const getUser = async (id) => {
    try {
        const userRef = await firebase_1.db.collection(user_entity_1.USER_COLLECTION_KEY).where("user_id", "==", id);
        const doc = await userRef.get();
        if (!doc.empty) {
            // Loop through the results (there might be multiple matches)
            let userData;
            doc.forEach((doc) => {
                // Access the document data
                userData = doc.data();
                userData.docId = doc.id;
            });
            return userData;
        }
        else {
            console.log("No user found with the specified email.");
            return;
        }
    }
    catch (err) {
        throw new exceptions_1.APIError("Something went wrong", statusCode_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.getUser = getUser;
const getUserByEmail = async (email) => {
    try {
        const userRef = await firebase_1.db.collection(user_entity_1.USER_COLLECTION_KEY).where("email", "==", email);
        const doc = await userRef.get();
        if (!doc.empty) {
            // Loop through the results (there might be multiple matches)
            let userData;
            doc.forEach((doc) => {
                // Access the document data
                userData = doc.data();
                userData.docId = doc.id;
            });
            return userData;
        }
        else {
            console.log("No user found with the specified email.");
            return;
        }
    }
    catch (err) {
        throw new exceptions_1.APIError("Something went wrong", statusCode_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=index.js.map