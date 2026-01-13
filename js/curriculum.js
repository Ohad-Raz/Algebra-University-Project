// TODO: Add curriculum data structure
// //async allows us to wait!
// Global variable to store courses for filtering without re-fetching
let allCourses = [];

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // 1. Fetch Data
    try {
        const response = await fetch("https://www.fulek.com/data/api/supit/curriculum-list/en", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                window.location.href = "login.html";
                return;
            }
            throw new Error("Failed to fetch curriculum");
        }

        const data = await response.json();
        allCourses = data.data; // Store globally!
    } catch (error) {
        console.error("Error loading curriculum:", error);
        // Fallback: if fetch totally fails (network), maybe show a message
        const container = document.getElementById("courses_container");
        if (container) {
            container.innerHTML = `<p class="error-message">Error loading courses. Please try again later.</p>`;
        }
        return;
    }

    // 2. Initial Render
    renderCourses(allCourses);
    populateSuggestions(allCourses);

    // 3. Setup Search Listener
    const searchInput = document.getElementById("course_search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            
            // Filter logic
            const filtered = allCourses.filter(course => 
                course.course.toLowerCase().includes(term)
            );
            
            renderCourses(filtered);
        });
    }
});

// Global array to store selected courses
let selectedCourses = [];

// Helper function to render a list of courses
function renderCourses(courses) {
    const container = document.getElementById("courses_container");
    container.innerHTML = ""; // Clear current list

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

        // Make the whole card clickable for details
        item.addEventListener("click", (e) => {
            // If the user clicked the "Add" button, don't navigate!
            if (e.target.classList.contains("add-btn")) return;
            window.location.href = `course.html?id=${c.id}`;
        });
        
        // Add click listener for the "Add" button
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
        // querySelector Returns the FIRST matching element directly
        // Remove button logic
        row.querySelector(".delete-btn").addEventListener("click", () => removeFromSelection(c.id));
        
        tbody.appendChild(row);
    });

    // Update Totals
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
