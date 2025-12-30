// TODO: Add authentication state management
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register_form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // 1) Read inputs
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // 2) Send POST request with fetch
    // 3) Handle response
    const response = await fetch(
      "https://www.fulek.com/data/api/user/register",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    // 4) Show message + redirect
    if (data.isSuccess || (response.ok && !data.data?.errorMessages)) {
      window.location.href = "/pages/login.html";
      console.log("Register successful");
    } else {
      const errorMessage = document.getElementById("register_message");
      errorMessage.textContent =
        data.errorMessages?.[0] ?? "Registration failed";
      console.log(errorMessage.textContent);
    }
  });
});

// TODO: Add login form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login_form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // 1) Read inputs
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // 2) Send POST request with fetch
    // 3) Handle response
    const response = await fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    // 4) Show message + redirect
    if (
      data.isSuccess ||
      (response.ok && data.data?.token && !data.data?.errorMessages)
    ) {
      localStorage.setItem("token", data.data.token); // first accesing Data var and then 'data from json
      console.log("Login successful");
      // console.log(localStorage.getItem("token"));
      window.location.href = "/pages/curriculum.html";
    } else {
      const errorMessage = document.getElementById("login_message");
      errorMessage.textContent = data.errorMessages?.[0] ?? "Login failed";
      console.log(errorMessage.textContent);
    }
  });
});
// TODO: Add login submission handler
// TODO: Add session management functions
// TODO: Add logout functionality
// TODO: Add authentication check functions
// TODO: Add redirect logic for protected pages
