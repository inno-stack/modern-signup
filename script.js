const form = document.getElementById("form");
const firstnameInput = document.getElementById("firstname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById("repeat-password-input");
const errorsMessage = document.getElementById("errro-message");

form.addEventListener("submit", (e) => {
  // e.preventDefault() Prevent Submit

  let errors = [];
  if (firstnameInput) {
    // if we have a firstname input then we in the Signup
    errors = getSignupfromErrors(
      firstnameInput.value,
      emailInput.value,
      passwordInput.value,
      repeatPasswordInput.value
    );
  } else {
    // if we dont have a firstname input then we are in the login
    errors = getLoginFormErrors(emailInput.value, passwordInput.value);
  }
  if (errors.length > 0) {
    // if there are any errors
    e.preventDefault();
    errorsMessage.innerText = errors.join(". ");
  }
});

function getSignupfromErrors(firstname, email, password, repeatPassword) {
  let errors = [];
  if (firstname === "" || firstname == null) {
    errors.push("Firstname is requred");
    firstnameInput.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is requred");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is requred");
    passwordInput.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 character");
    passwordInput.parentElement.classList.add("incorrect");
  }

  if (password !== repeatPassword) {
    errors.push("Password does not match Confairm password");
    passwordInput.parentElement.classList.add("incorrect");
    repeatPasswordInput.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is requred");
    emailInput.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is requred");
    passwordInput.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [
  firstnameInput,
  emailInput,
  passwordInput,
  repeatPasswordInput,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      // remove error message from screen
      errorsMessage.innerText = "";
    }
  });
});

// Show/Hide the eye icon based on input
function toggleEyeIcon() {
  const passwordField = document.getElementById("password-input");
  const eyeIcon = document.getElementById("eye-icon");

  if (passwordField.value.trim().length > 0) {
    eyeIcon.classList.remove("hidden");
  } else {
    eyeIcon.classList.add("hidden");
  }
}

// Hide the eye icon on blur if the field is empty
function hideEyeIcon() {
  const passwordField = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  if (passwordField.value.trim().length === 0) {
    eyeIcon.classList.add("hidden");
  }
}

// Toggle password visibility
function togglePasswordVisibility() {
  const passwordField = document.getElementById("password-input");
  const eyeIconClass = document.getElementById("eye-icon-class");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIconClass.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIconClass.classList.replace("fa-eye-slash", "fa-eye");
  }
}
