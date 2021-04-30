import firebase from "firebase/app"
import 'firebase/storage'
import 'firebase/firestore'
//figure out how to set env variables correctly
const firebaseConfig = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "portfolio-7ed56.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()

export { projectFirestore, projectStorage }

export default firebaseConfig
