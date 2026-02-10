/**
 * course.js
 * Logic for fetching and displaying detailed information 
 * for a single course via the API.
 */

// Extracting the 'id' from the URL to identify which course to load.
const id = new URLSearchParams(window.location.search).get("id");

// This function fetches the specific details for just one course using its ID.
async function loadCourse() {
  try {
    const response = await fetch(
      `https://www.fulek.com/data/api/supit/get-curriculum/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Secured request
        },
      }
    );
    
    if (!response.ok) {
      // If the API fails or the ID is wrong, go back to the curriculum list.
      window.location.href = "curriculum.html";
      return;
    }

    const data = await response.json();
    const c = data.data;

    // Creating a new div to hold the detailed info and injecting the data.
    const courseDetails = document.createElement("div");
    courseDetails.innerHTML = `
          <h3>${c.kolegij}</h3>
        <p>ECTS: ${c.ects}, Hours: ${c.sati}</p>
        <p>Lectures: ${c.predavanja}, Exercises: ${c.vjezbe}</p>
        <p>Semester: ${c.semestar}, Type: ${c.tip}</p>
    `;
    // Appending the details into the main container on the page.
    document.getElementById("course_container").appendChild(courseDetails);
  } catch (error) {
    console.error("Error fetching course details:", error);
    // If there's a network error, show a friendly message to the user.
    document.getElementById("course_container").innerHTML = 
      "<p class='error-message'>Failed to load course details. Please check your connection.</p>";
  }
}

// Only run the fetch if an ID was actually found in the URL.
if (id) {//In contrast to when I use c#, this if(id) coverts itself to bool
  loadCourse();
}
