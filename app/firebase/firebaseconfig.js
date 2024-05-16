import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"


const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  measurementId: Constants.expoConfig.extra.measurementId,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);