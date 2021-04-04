import firebase from "firebase/app"
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCdd5SW1RgP0oct6-iWJMio0RQBSo3ko5Y",
  authDomain: "portfolio-7ed56.firebaseapp.com",
  projectId: "portfolio-7ed56",
  storageBucket: "portfolio-7ed56.appspot.com",
  messagingSenderId: "258032597616",
  appId: "1:258032597616:web:70f12097878d92002cd2b5",
  measurementId: "G-BNLE35FDSX"
})

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()

export { projectFirestore, projectStorage }

export default firebaseConfig
