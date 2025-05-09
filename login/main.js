

// Initialize Firebase
let id = 2; //admin = 1, student = 0, other = 2;


//logs into google and shows the user type
function loginGoogle() {
    const signin = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(signin)
        .then((result) => {
            const username = result.user;
            if (username.email === "sbearam1@gmail.com" || username.email === "mattmatt314159@gmail.com") {
                id = 1;
                console.log("You are", id);
            }
            else if (username.email === "sbearam1@umbc.edu" || username.email === "mbainbr1@umbc.edu") {
                id = 0;
                console.log("You are", id);
            }
            else {
                id = 2;
                console.log("You are", id);
            }
        })
        .catch(error => {
            id = 2;
            console.log("You failed to log in");

        });
}

