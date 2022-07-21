import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import 'firebase/database';



import getFirebaseConfig from './firebaseConfig'; 


let firebaseConfig = getFirebaseConfig();


// if(process.env.REACT_APP_STAGE == "development"){


//    firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSEGINGSENDERID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTID
//   };


// }else{
    
//    firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSEGINGSENDERID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTID
//   };
// }

// console.log("NODE ENV: " + process.env.NODE_ENV);
// console.log("REACT_APP_STAGE ENV: " + process.env.REACT_APP_STAGE);
// console.log("REACT_APP__NODE_ENDPOINT ENV: " , process.env.REACT_APP_STAGE == "development" ?  process.env.REACT_APP_TEST_NODE_ENDPOINT : process.env.REACT_APP_LIVE_NODE_ENDPOINT);


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage(); 
export const rdb = firebase.database();

