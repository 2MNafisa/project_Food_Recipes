const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Form and error elements
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('input-box');
    const passwordInput = document.getElementById('text-warning');
    
    

    // Validate form on submit
    signupForm.addEventListener('submit'), (event) => {
      let isValid = true;
    }

      // Validate username
      if (!usernameRegex.test(usernameInput.value)) {
        usernameError.textContent = 'Username must be 3-16 characters and can include letters, numbers, dots, underscores, or hyphens.';
        isValid = false;
      } 
        
      

      // Validate password
      if (!passwordRegex.test(passwordInput.value)) {
        passwordError.textContent = 'Password must be at least 8 characters long and include at least one letter and one number.';
        isValid = false;
      } else {
        passwordError.textContent = '';
      }