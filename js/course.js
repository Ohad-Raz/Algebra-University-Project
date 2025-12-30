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
        <h3>${c.course}</h3>
      <p>ECTS: ${c.ects}, Hours: ${c.hours}</p>
      <p>Lectures: ${c.lectures}, Exercises: ${c.exercises}</p>
      <p>Semester: ${c.semester}, Type: ${c.type}</p>
      <a href="/pages/course.html?id=${c.id}">View Course</a>
  `;
  document.getElementById("course_container").appendChild(courseContainer);
});
