/**
 * curriculum.js
 * Curriculum management, data fetching, and course selection 
 * logic for the secured student area.
 */

// --- State Management ---
// I create a global array to store all courses fetched from the API.
// This allows me to filter them locally without making new network requests every time.
let allCourses = [];

// I check if the token exists right away. If not, the user can't see this page.
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// 1. Fetch Curriculum Data
// I'm using an async function with 'await' to fetch the whole list of courses.
// Notice that I include the Bearer token in the 'Authorization' header.
async function initCurriculum() {
    try {
        const response = await fetch("https://www.fulek.com/data/api/supit/curriculum-list/en", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
            // Handle specific case where token might have expired (401 Unauthorized)
            if (response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "login.html";
                return;
            }
            throw new Error("Failed to fetch curriculum");
        }

        const data = await response.json();
        allCourses = data.data; // Saving the result to our global array
        
        // After fetching, I render the initial cards and populate the 'search suggestions'.
        renderCourses(allCourses);
        populateSuggestions(allCourses);
    } catch (error) {
        console.error("Error loading curriculum:", error);
        const container = document.getElementById("courses_container");
        if (container) {
            container.innerHTML = `<p class="error-message">Error loading courses. Please try again later.</p>`;
        }
        return;
    }
}

initCurriculum();

// 3. Setup Search Listener
// This listens for every keystroke in the search bar.
// I filter our global 'allCourses' array based on whether the name contains the search term.
const searchInput = document.getElementById("course_search");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        
        const filtered = allCourses.filter(course => 
            course.course.toLowerCase().includes(term)
        );
        
        // I re-render the course grid with only the filtered items.
        renderCourses(filtered);
    });
}

// Global array to store selected courses
let selectedCourses = [];

// Helper function to render the course grid
// I'm dynamically creating HTML elements for each course.
function renderCourses(courses) {
    const container = document.getElementById("courses_container");
    container.innerHTML = ""; 

    courses.forEach((c) => {
        const item = document.createElement("div");
        item.className = "course-item";
        
        item.innerHTML = `
            <h3>${c.course}</h3>
            <p>ECTS: ${c.ects}, Hours: ${c.hours}</p>
            <p>Semester: ${c.semester}, Type: ${c.type}</p>
            <button class="add-btn" data-id="${c.id}">Add Course</button>
            <span class="curriculum_message"></span>
        `;

        // If the card is clicked (but not the button), I navigate to the details page.
        item.addEventListener("click", (e) => {
            if (e.target.classList.contains("add-btn")) return;
            window.location.href = `course.html?id=${c.id}`;
        });
        
        // I attach a listener to the 'Add' button to push it to our selected list.
        const addBtn = item.querySelector(".add-btn");
        addBtn.addEventListener("click", (e) => addToSelection(c,e));

        container.appendChild(item);
    });
}

function addToSelection(course,event) {
    // 1. Check if potential duplicates
    const exists = selectedCourses.find(c => c.id === course.id);
    // Find the specific span in THIS card
    // event.target is the button. The span is in the same parent (the card div).
    const btn = event.target;
    const card = btn.parentElement; 
    const msgSpan = card.querySelector(".curriculum_message");
    if (exists) {
        // alert("Course already selected!");
        msgSpan.textContent = "Course already selected!";
        return;
    }
    else{
       msgSpan.textContent="";
    }

    // 2. Add to array
    selectedCourses.push(course);

    // 3. Update Table
    renderTable();
}

function removeFromSelection(courseId) {
    selectedCourses = selectedCourses.filter(c => c.id !== courseId);
    renderTable();
}

// Function to update the summary table (ECTS and Hours)
// I loop through every selected course and calculate the totals.
function renderTable() {
    const tbody = document.getElementById("selected_body");
    const totalEctsEl = document.getElementById("total_ects");
    const totalHoursEl = document.getElementById("total_hours");

    tbody.innerHTML = "";
    
    let sumEcts = 0;
    let sumHours = 0;

    selectedCourses.forEach(c => {
        sumEcts += c.ects;
        sumHours += c.hours;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${c.course}</td>
            <td>${c.ects}</td>
            <td>${c.hours}</td>
            <td><button class="delete-btn">Remove</button></td>
        `;
        
        // I add a listener for the 'Remove' button to update the state.
        row.querySelector(".delete-btn").addEventListener("click", () => removeFromSelection(c.id));
        tbody.appendChild(row);
    });

    // Finally, I update the total numbers at the bottom of the table.
    totalEctsEl.innerText = sumEcts;
    totalHoursEl.innerText = sumHours;
}
function populateSuggestions(courses) {
    const datalist = document.getElementById("course_options");
    datalist.innerHTML = ""; // Clear
    
    courses.forEach(c => {
        const option = document.createElement("option");
        option.value = c.course; // This is what the user sees in the dropdown
        datalist.appendChild(option);
    });
}
