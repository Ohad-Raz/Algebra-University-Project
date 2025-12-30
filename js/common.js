// TODO: Add common utility functions
// TODO: Add navigation functionality
document.addEventListener("DOMContentLoaded", () => { // this is a good practice to check if the page is loaded
  const logout = document.getElementById("logout");
  if (logout) {
    logout.addEventListener("click", () => {
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

