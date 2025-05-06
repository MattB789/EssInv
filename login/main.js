


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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// Initialize Firebase
let id = 2; //admin = 1, student = 0, other = 2;



function loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            if (user.email === "sbearam1@gmail.com" || user.email === "mattmatt314159@gmail.com") {
                id = 1;
                console.log("You are", id);
            }
            else if (user.email === "sbearam1@umbc.edu" || user.email === "mbainbr1@umbc.edu") {
                id = 0;
                console.log("You are", id);
            }
            else {
                id = 2;
                console.log("You are", id);
            }
        })
        .catch(error => {
            console.error('Error signing in:', error);
            alert("Login failed");
        });
}
