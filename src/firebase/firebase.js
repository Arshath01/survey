// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";


// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
// export default { firebaseApp, auth };

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHyjge6-rgd6GekZrdq3_T78rzYyio-dM",
  authDomain: "survey-fea6c.firebaseapp.com",
  projectId: "survey-fea6c",
  storageBucket: "survey-fea6c.appspot.com",
  messagingSenderId: "885460802643",
  appId: "1:885460802643:web:7548c89d90d9e3e282faa6",
  measurementId: "G-VB79L3P55S"
};



const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app)

export const db = getFirestore(app)
