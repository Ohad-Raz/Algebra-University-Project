// TODO: Add curriculum data structure
// //async allows us to wait!
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/pages/login.html";
    return;
  }

  const response = await fetch(
    "https://www.fulek.com/data/api/supit/curriculum-list/en",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  const courses = data.data;

  const container = document.getElementById("courses_container");
  if (!container) return;

  container.innerHTML = "";

  courses.forEach((c) => {
    const item = document.createElement("div");
    item.className = "course-item";
    item.innerHTML = `
      <h3>${c.course}</h3>
      <p>ECTS: ${c.ects}, Hours: ${c.hours}</p>
      <p>Lectures: ${c.lectures}, Exercises: ${c.exercises}</p>
      <p>Semester: ${c.semester}, Type: ${c.type}</p>
      <a href="/pages/course.html?id=${c.id}">View Course</a>
    `;
    container.appendChild(item);

  });

  item.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `/pages/course.html?id=${c.id}`;
  });
});

// TODO: Add program selection logic
// TODO: Add course listing functionality
// TODO: Add filtering/search functionality for courses
// TODO: Add course details display logic
// TODO: Add curriculum navigation handlers
