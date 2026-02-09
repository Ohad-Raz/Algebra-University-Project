/**
 * course.js
 * Logic for fetching and displaying detailed information 
 * for a single course via the API.
 */

// I'm using URLSearchParams to grab the 'id' from the browser's address bar.
const id = new URLSearchParams(window.location.search).get("id");

// This function fetches the specific details for just one course using its ID.
async function loadCourse() {
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
    window.location.href = "/pages/curriculum.html";
    return;
  }
  const data = await response.json();
  const c = data.data;

  // I'm dynamically creating a container and filling it with the course data.
  const courseContainer = document.createElement("div");
  courseContainer.innerHTML = `
        <h3>${c.kolegij}</h3>
      <p>ECTS: ${c.ects}, Hours: ${c.sati}</p>
      <p>Lectures: ${c.predavanja}, Exercises: ${c.vjezbe}</p>
      <p>Semester: ${c.semestar}, Type: ${c.tip}</p>
  `;
  document.getElementById("course_container").appendChild(courseContainer);
}

// Only run the fetch if an ID was actually found in the URL.
if (id) {
  loadCourse();
}
