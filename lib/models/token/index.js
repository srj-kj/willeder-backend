"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.addToken = exports.getToken = void 0;
/* eslint-disable max-len */
const firebase_1 = require("../../utils/firebase");
const token_entity_1 = require("./token.entity");
const COLLECTION_KEY = token_entity_1.TOKEN_COLLECTION_KEY;
const converter = token_entity_1.tokenConverter;
const getToken = async (id) => {
    try {
        const docRef = firebase_1.db.collection(COLLECTION_KEY).doc(id).withConverter(converter);
        const docSnap = await docRef.get();
        return docSnap.data();
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.getToken = getToken;
const addToken = async (token) => {
    try {
        const docRef = firebase_1.db.collection(COLLECTION_KEY).doc(token.token_id).withConverter(converter);
        await docRef.set(token, { merge: true });
        return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.addToken = addToken;
const deleteToken = async (id) => {
    try {
        const docRef = firebase_1.db.collection(COLLECTION_KEY).doc(id).withConverter(converter);
        await docRef.delete();
        return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.deleteToken = deleteToken;
//# sourceMappingURL=index.js.map