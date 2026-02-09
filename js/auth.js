/**
 * auth.js
 * Authentication state management and form validation for 
 * Algebra University project.
 */

// --- Initialization & Validation ---

// Here I'm handling the Register form submission. 
// I take the username and password from the input fields and send them to the API.
const registerForm = document.getElementById("register_form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // I'm using 'fetch' to send a POST request with the user data as a JSON string.
    const response = await fetch("https://www.fulek.com/data/api/user/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    // If the API returns success, I redirect the user to the login page.
    if (data.isSuccess) {
      window.location.href = "login.html";
    } else {
      // Otherwise, I show the specific error message returned by the server.
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

    // On successful login, I save the unique 'token' to localStorage.
    // This token is required for all subsequent API calls in the secured areas.
    if (data.isSuccess) {
      localStorage.setItem("token", data.data.token);
      window.location.href = "curriculum.html";
    } else {
      const msg = document.getElementById("login_message");
      if (msg) msg.textContent = data.errorMessages?.[0] ?? "Login failed";
    }
  });
}

// --- Route Protection ---
// Here I'm checking if the user is trying to access the Curriculum page without being logged in.
// If the token is missing, I kick them back to the Login page for security.
if (window.location.pathname.includes("curriculum.html")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
}
