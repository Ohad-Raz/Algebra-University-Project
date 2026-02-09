/**
 * common.js
 * Global utility functions, navigation logic, and shared UI components
 * across all pages of the Algebra University website.
 */

// --- Navigation & Shared UI ---
/**
 * Updates the navigation visibility based on the user's login status.
 * I use classes instead of IDs to catch all instances (desktop/mobile).
 */
function updateNavigation() {
    const token = localStorage.getItem("token");
    const loginItems = document.querySelectorAll('.nav-item-login');
    const logoutItems = document.querySelectorAll('.nav-item-logout');

    if (token) {
        loginItems.forEach(item => item.style.display = 'none');
        logoutItems.forEach(item => item.style.display = 'block');
    } else {
        loginItems.forEach(item => item.style.display = 'block');
        logoutItems.forEach(item => item.style.display = 'none');
    }
}

// Initial update
updateNavigation();

// Logout Logic
const logoutBtn = document.getElementById("nav_logout");
if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        
        // Path handling: If we are in the 'pages' folder, redirect to 'login.html' here.
        // Otherwise, redirect to 'pages/login.html'.
        const currentPath = window.location.pathname;
        if (currentPath.includes("/pages/")) {
            window.location.href = "login.html";
        } else {
            window.location.href = "pages/login.html";
        }
    });
}

// This block handles the mobile 'hamburger' menu toggle.
// It simply adds or removes an 'open' class to show/hide the menu on small screens.
const navToggle = document.getElementById("nav_toggle");
const navbar = document.getElementById("navbar");

if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", navbar.classList.contains("open"));
  });
}

// Accordion Functionality (used for History/FAQ sections)
// I'm selecting all header elements for the accordion. When one is clicked, 
// I toggle the 'active' class on its parent item to expand or collapse it.
const accordionHeaders = document.querySelectorAll(".accordion-header");
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isActive = item.classList.contains("active");

    // I clear all other active items first so only one stays open at a time.
    document.querySelectorAll(".accordion-item").forEach((i) => {
      i.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// --- Future Utilities & Hooks ---
