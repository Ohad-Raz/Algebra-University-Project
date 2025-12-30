// TODO: Add common utility functions
// TODO: Add navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  const loginLink = document.getElementById("nav_login");
  const logoutLink = document.getElementById("nav_logout");

  // Toggle links safely only if they exist on the page
  if (loginLink && logoutLink) {
    if (token) {
      loginLink.style.display = "none";
      logoutLink.style.display = "block";
    } else {
      loginLink.style.display = "block";
      logoutLink.style.display = "none";
    }

    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "/pages/login.html";
    });
  }
});

// TODO: Add header/footer rendering logic
// TODO: Add common event handlers
// TODO: Add helper functions for DOM manipulation
// TODO: Add utility functions for data formatting
// TODO: Add error handling utilities
