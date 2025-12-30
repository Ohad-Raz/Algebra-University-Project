// TODO: Add curriculum data structure
// //async allows us to wait!
const token = localStorage.getItem("token");
console.log(token);
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Token is present");
  } else {
    console.log("Token is not present");
    window.location.href = "/pages/login.html";
  }
  const response = await fetch(
    "https://www.fulek.com/data/api/supit/curriculum-list/en",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  const Courses = data.data;
  const courses_container = document.getElementById("courses_container");
  Courses.forEach((c) => {
    const item = document.createElement("div");
    item.className = "course-item";
    item.innerHTML = `
      <h3>${c.course}</h3>
      <p>ECTS: ${c.ects}</p>
      <p>Hours: ${c.hours}</p>
      <p>Lectures: ${c.lectures}</p>
      <p>Exercises: ${c.exercises}</p>
      <p>Semester: ${c.semester}</p>
      <p>Type: ${c.type}</p>
      <p>ID: ${c.id}</p>
    `;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(c.id);
      // window.location.href = `/pages/course.html?id=${c.id}`;
    });
    courses_container.appendChild(item);
  });
});
// TODO: Add program selection logic
// TODO: Add course listing functionality
// TODO: Add filtering/search functionality for courses
// TODO: Add course details display logic
// TODO: Add curriculum navigation handlers
