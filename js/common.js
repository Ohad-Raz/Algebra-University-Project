/**
 * common.js
 * Global utility functions, navigation logic, and shared UI components
 * across all pages of the Algebra University website.
 */

// --- Navigation & Shared UI ---
/**
 * Updates the navigation visibility based on the user's login status.
 * Using classes for all nav items ensures both desktop and mobile navigation are updated.
 */
function updateNavigation() {
  const token = localStorage.getItem("token");
  const loginItems = document.querySelectorAll(".nav-item-login");
  const logoutItems = document.querySelectorAll(".nav-item-logout"); //technically I have one so all in redundant but future proof

  if (token) {
    loginItems.forEach((item) => (item.style.display = "none"));
    logoutItems.forEach((item) => (item.style.display = "block"));
  } else {
    loginItems.forEach((item) => (item.style.display = "block"));
    logoutItems.forEach((item) => (item.style.display = "none"));
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

    // Path handling: If in the 'pages' folder, redirect to 'login.html' here.
    // Otherwise, redirect to 'pages/login.html' can happen with my index.html vs pages folder.
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
  //checking if the nav toggle and navbar elements exist
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });
}

// Accordion Functionality (used for History)
// Selecting all header elements for the accordion. When one is clicked,
// the 'active' class is toggled on its parent item to expand or collapse it.
const accordionHeaders = document.querySelectorAll(".accordion-header"); //selecting all header elements for the accordion
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement; //getting the parent element of the header
    const isActive = item.classList.contains("active"); //checking if the item is active

    // Clear all other active items first so only one stays open at a time.
    document.querySelectorAll(".accordion-item").forEach((i) => {
      //selecting all accordion items
      i.classList.remove("active"); //removing the active class from the item
    });

    if (!isActive) {
      //if the item is not active, add the active class to the item
      item.classList.add("active");
    }
  });
  //not using toggle like navbar because I want only one accordion item to be open at a time!
});
