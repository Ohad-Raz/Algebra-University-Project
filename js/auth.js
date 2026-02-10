/**
 * auth.js
 * Authentication state management and form validation for 
 * Algebra University project.
 */

// --- Initialization & Validation ---

// Handling the Register form submission. 
// Username and password values are extracted and sent to the API.
const registerForm = document.getElementById("register_form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Sending request with user credentials.
    const response = await fetch("https://www.fulek.com/data/api/user/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    // On API success, the user is redirected to the login page.
    if (data.isSuccess) {
      window.location.href = "login.html";
    } else {
      // Show the specific error message returned by the server.
      const msg = document.getElementById("register_message");
      if (msg) msg.textContent = data.errorMessages?.[0] ?? "Registration failed";
    }
  });
}

// Same logic for the Login form.
const loginForm = document.getElementById("login_form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const response = await fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    // Successful login returns a token, which is saved to localStorage.
    // This token will be used for calling the curriculum courses.
    if (data.isSuccess) {
      localStorage.setItem("token", data.data.token);
      window.location.href = "curriculum.html";
    } else {
      const msg = document.getElementById("login_message");
      if (msg) msg.textContent = data.errorMessages?.[0] ?? "Login failed";//elvies operator if error message is null or undefined, it will display "Login failed"
    }
  });
}

// --- Route Protection ---
// Check for Curriculum page access without being logged in.
// If the token is missing, redirect to the Login page for security.
if (window.location.pathname.includes("curriculum.html")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
}
