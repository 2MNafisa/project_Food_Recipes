
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


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
    event.preventDefault()

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Creating Account...")
            window.location.href ="grand.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
});