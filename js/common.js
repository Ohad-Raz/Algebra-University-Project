// TODO: Add common utility functions
// TODO: Add navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  const loginLink = document.getElementById("nav_login");
  const logoutLink = document.getElementById("nav_logout");

  // Toggle links safely only if they exist on the page
  if (loginLink && logoutLink) {
    const loginItem = loginLink.parentElement;
    const logoutItem = logoutLink.parentElement;

    if (token) {
      loginItem.style.display = "none";
      logoutItem.style.display = "block";
    } else {
      loginItem.style.display = "block";
      logoutItem.style.display = "none";
    }

    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }
  const navToggle = document.getElementById("nav_toggle");
  const navbar = document.getElementById("navbar");

  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", navbar.classList.contains("open"));
  });

  // Accordion Functionality
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      // Optional: Close other items
      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});

// TODO: Add header/footer rendering logic
// TODO: Add common event handlers
// TODO: Add helper functions for DOM manipulation
// TODO: Add utility functions for data formatting
// TODO: Add error handling utilities
