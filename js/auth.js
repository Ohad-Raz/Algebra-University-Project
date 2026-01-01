// TODO: Add authentication state management

// TODO: Add login form validation
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register_form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
//send POST request with fetch
      const response = await fetch("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.isSuccess) {
        window.location.href = "login.html";
      } else {
        const msg = document.getElementById("register_message");
        if (msg) msg.textContent = data.errorMessages?.[0] ?? "Registration failed";
      }
    });
  }

  const loginForm = document.getElementById("login_form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
//send POST request with fetch
      const response = await fetch("https://www.fulek.com/data/api/user/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
//show message if login failed
      if (data.isSuccess) {
        localStorage.setItem("token", data.data.token);
        window.location.href = "curriculum.html";
      } else {
        const msg = document.getElementById("login_message");
        if (msg) msg.textContent = data.errorMessages?.[0] ?? "Login failed";
      }
    });
  }
});

// TODO: Add login submission handler
// TODO: Add session management functions
// TODO: Add logout functionality
// TODO: Add authentication check functions
// TODO: Add redirect logic for protected pages
