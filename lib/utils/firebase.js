"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminauth = exports.db = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
const firebase_admin_1 = __importStar(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const serviceAccount_json_1 = __importDefault(require("./serviceAccounts/serviceAccount.json"));
const config = process.env.NODE_ENV === "production" ? serviceAccount_json_1.default : serviceAccount_json_1.default;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config),
});
const db = (0, firebase_admin_1.firestore)();
exports.db = db;
const adminauth = firebase_admin_1.default.auth();
exports.adminauth = adminauth;
//# sourceMappingURL=firebase.js.map