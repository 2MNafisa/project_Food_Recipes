import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAVH5WPTmTjyOAncSIvYD5ctYD1ymbwu9Y",
    authDomain: "fireprojectpart1.firebaseapp.com",
    projectId: "fireprojectpart1",
    storageBucket: "fireprojectpart1.firebasestorage.app",
    messagingSenderId: "836108136757",
    appId: "1:836108136757:web:7dc0eaa6badd5ddeda9c7c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    console.log("hello");
    event.preventDefault();

    const email = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("Successfully logged in!");
            window.location.href ="http://127.0.0.1:5501/homepage.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('sms1').innerText = errorMessage;

        });
});