/**
 * course.js
 * Logic for fetching and displaying detailed information 
 * for a single course via the API.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const response = await fetch(
    `https://www.fulek.com/data/api/supit/get-curriculum/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    window.location.href = "/pages/curriculum.html";
    return;
  }
  const data = await response.json();
  const c = data.data;
  console.log(c);
  const courseContainer = document.createElement("div");
  courseContainer.innerHTML = `
        <h3>${c.kolegij}</h3>
      <p>ECTS: ${c.ects}, Hours: ${c.sati}</p>
      <p>Lectures: ${c.predavanja}, Exercises: ${c.vjezbe}</p>
      <p>Semester: ${c.semestar}, Type: ${c.tip}</p>
  `;
  document.getElementById("course_container").appendChild(courseContainer);
});
