import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB2k1TEHZTcOBmfdt6uRekQnsY-LRs6P_g",
  authDomain: "myfirstproject-89f60.firebaseapp.com",
  projectId: "myfirstproject-89f60",
  storageBucket: "myfirstproject-89f60.appspot.com",
  messagingSenderId: "383098748456",
  appId: "1:383098748456:web:f165467a3daa63055c3f1d"
};

const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app)
const auth=getAuth(app)
export {fireDB,auth}