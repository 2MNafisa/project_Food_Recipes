// Initialize Firebase with your config

const firebaseConfig = {
    apiKey: "AIzaSyAVH5WPTmTjyOAncSIvYD5ctYD1ymbwu9Y",
    authDomain: "fireprojectpart1.firebaseapp.com",
    projectId: "fireprojectpart1",
    storageBucket: "fireprojectpart1.firebasestorage.app",
    messagingSenderId: "836108136757",
    appId: "1:836108136757:web:7dc0eaa6badd5ddeda9c7c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    console.log("hello")
    const form = document.getElementById('form');
    const username_input = document.getElementById('username-input');
    const email_input = document.getElementById('email-input');
    const password_input = document.getElementById('password-input');
    const confirm_password_input = document.getElementById('confirm-password-input');
    const error_message = document.getElementById('error-message');
    const submit_button = document.getElementById('submit');
    const loading_spinner = document.getElementById('loading-spinner'); // Loading spinner element

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset error message and disable submit button
        error_message.innerText = '';
        submit_button.disabled = true;

        // Show loading spinner
        loading_spinner.style.display = 'block'; // Show the loader

        // Get form values
        const username = username_input.value.trim();
        const email = email_input.value.trim();
        const password = password_input.value;
        const confirmPassword = confirm_password_input.value;

        try {
            // Validate form inputs
            const errors = validateForm(username, email, password, confirmPassword);
            if (errors.length > 0) {
                throw new Error(errors.join('. '));
            }

            // Create user in Firebase Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);

            // Add user data to Firestore
            await db.collection('users').doc(userCredential.user.uid).set({
                username: username,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Update profile with username
            await userCredential.user.updateProfile({
                displayName: username
            });

            // Show success message
            error_message.style.color = 'green';
            error_message.innerText = 'Account created successfully!';

            // Clear form
            form.reset();

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:5501/javascript/rahman.html';
            }, 2000);

        } catch (error) {
            error_message.style.color = 'red';

            // Log the full error for debugging
            console.error(error);

            // If it's a Firebase error, provide more user-friendly messages
            if (error.code) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        error_message.innerText = 'This email is already registered. Please use a different email or try logging in.';
                        break;
                    case 'auth/invalid-email':
                        error_message.innerText = 'Please enter a valid email address.';
                        break;
                    case 'auth/weak-password':
                        error_message.innerText = 'Password is too weak. Please use a stronger password.';
                        break;
                    case 'auth/internal-error':
                        error_message.innerText = 'There was an internal error with Firebase. Please try again later.';
                        break;
                    default:
                        error_message.innerText = 'An unknown error occurred. Please try again.';
                }
            } else {
                // For other types of errors
                error_message.innerText = error.message || 'An error occurred during signup. Please try again.';
            }
        } finally {
            // Re-enable submit button and hide loading spinner
            submit_button.disabled = false;
            loading_spinner.style.display = 'none'; // Hide the loader
        }
    });


    // Form validation function
    function validateForm(username, email, password, confirmPassword) {
        const errors = [];

        // Username validation (2-30 characters, letters only)
        if (!username.match(/^[A-Za-z]{2,30}$/)) {
            errors.push('Username must be 2-30 characters long and contain only letters');
        }

        // Email validation
        if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            errors.push('Please enter a valid email address');
        }

        // Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
        if (!password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            errors.push('Password must be at least 8 characters long and include uppercase, lowercase, number and special character');
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }

        return errors;
    }
});
