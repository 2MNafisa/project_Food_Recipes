const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const confirm_password_input = document.getElementById('confirm-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let errors = [];

    if (firstname_input) {
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, confirm_password_input.value);
    } else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(" . ");
        error_message.style.color = "red";
    } else {
        e.preventDefault();  // Prevent form submission to display success message
        error_message.innerText = "Form submitted successfully!";
        error_message.style.color = "green";

        // Optional: Add a delay before clearing the form (for visual confirmation)
        setTimeout(() => {
            error_message.innerText = "";
            form.reset();  // Clear the form inputs if needed
        }, 2000);
    }
});

function getSignupFormErrors(firstname, email, password, confirmPassword) {
    let errors = [];
    
    const nameRegex = /^[A-Za-z]{2,30}$/; // Only letters, length between 2-30.
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Valid email format.
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least 8 characters, 1 special character, 1 number, 1 lowercase, 1 uppercase letter.

    if (!nameRegex.test(firstname)) {
        errors.push('Firstname must contain only letters (2-30 characters).');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address.');
        email_input.parentElement.classList.add('incorrect');
    }
    if (!passwordRegex.test(password)) {
        errors.push('Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
        password_input.parentElement.classList.add('incorrect');
    }
    if (password !== confirmPassword) {
        errors.push('Password does not match confirm password.');
        password_input.parentElement.classList.add('incorrect');
        confirm_password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

const allInputs = [firstname_input, email_input, password_input, confirm_password_input];
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    });
});