/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import admin, {firestore, ServiceAccount} from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

import devConfig from "./serviceAccounts/firebase-dev";
import prodConfig from "./serviceAccounts/firebase-prod";
import serviceAccounts from "./serviceAccounts/serviceAccount.json";
import {FirebaseApp} from "firebase/app";

const config = process.env.NODE_ENV === "production" ? serviceAccounts : serviceAccounts;

admin.initializeApp({
  credential: admin.credential.cert(config as ServiceAccount),
});

const db = firestore();
const adminauth = admin.auth();
export {db, adminauth};
