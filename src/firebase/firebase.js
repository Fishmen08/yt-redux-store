import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXUvm5T0RQFLESTem-F6qLI8qIrfrAPPQ",
  authDomain: "yt-store-c9af7.firebaseapp.com",
  projectId: "yt-store-c9af7",
  storageBucket: "yt-store-c9af7.appspot.com",
  messagingSenderId: "332391904038",
  appId: "1:332391904038:web:47158da480157906a5c7e7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;