import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxlHZXw7gUdJlD8YTkjPFOy11ESx3p0N0",
    authDomain: "essinv-347c3.firebaseapp.com",
    projectId: "essinv-347c3",
    storageBucket: "essinv-347c3.firebasestorage.app",
    messagingSenderId: "341943484629",
    appId: "1:341943484629:web:183c44f0f5f7408490e25c",
    measurementId: "G-K24H73RWSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('loginBtn');
const usernameDiv = document.getElementById('username');

loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            const name = user.displayName || "User";
            usernameDiv.textContent = `Welcome, ${name}!`;
        })
        .catch(error => {
            console.error('Error signing in:', error);
            alert("Login failed");
        });
});
