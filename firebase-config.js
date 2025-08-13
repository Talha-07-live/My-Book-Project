import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpiN0OV1aD709Q987PymfOOp_lcW6Hid8",
  authDomain: "my-book-project-c5a17.firebaseapp.com",
  projectId: "my-book-project-c5a17",
  storageBucket: "my-book-project-c5a17.appspot.com",
  messagingSenderId: "422603504433",
  appId: "1:422603504433:web:e6870a7d2c57c045eb0e10",
  measurementId: "G-F763MR7FR9"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
