import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDxlHZXw7gUdJlD8YTkjPFOy11ESx3p0N0",
    authDomain: "essinv-347c3.firebaseapp.com",
    projectId: "essinv-347c3",
    storageBucket: "essinv-347c3.firebasestorage.app",
    messagingSenderId: "341943484629",
    appId: "1:341943484629:web:183c44f0f5f7408490e25c",
    measurementId: "G-K24H73RWSS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginGoogle = async () => {
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
        /*if(user.email === "sbearam1@gmail.com" || user.email === "mattmatt314159@gmail.com") {
            return {email: user.email, role: 1};
        } else if (user.email == "sbearam1@umbc.edu" || user.email === "mbainbr1@umbc.edu") {
            return {email: user.email, role: 0};
        } else {
            return {email: user.email, role: 2};
        }*/
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
    }
};

export {auth, provider};