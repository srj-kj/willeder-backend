// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeRTyYICz3nH_qbEHjcGy5qWCKc1J2Fw8",
  authDomain: "willeder-interview-backe-12a17.firebaseapp.com",
  projectId: "willeder-interview-backe-12a17",
  storageBucket: "willeder-interview-backe-12a17.appspot.com",
  messagingSenderId: "392231903805",
  appId: "1:392231903805:web:067caa6b5a9e96d36a0054",
  measurementId: "G-PQM8D9RH5T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export default app;
