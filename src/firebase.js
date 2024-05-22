
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCEMDLIbk5ApnQkot2GEXAIaUpi-o8SkbA",
  authDomain: "image-uploader-f7126.firebaseapp.com",
  projectId: "image-uploader-f7126",
  storageBucket: "image-uploader-f7126.appspot.com",
  messagingSenderId: "641791161666",
  appId: "1:641791161666:web:38f0e25b32f0b763ac44db"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)