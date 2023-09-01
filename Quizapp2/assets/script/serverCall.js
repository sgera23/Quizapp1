const apiKey = "ANwYNCOLrPQSAxBONc0sAzNq4rlOPqCqgCL5t4Ht";

document.getElementById("test-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const difficulty = document.getElementById("difficulty").value;
  const topic = document.getElementById("topic").value;
  const numQuestions = document.getElementById("numQuestions").value;

  const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=${numQuestions}&category=${topic}&difficulty=${difficulty}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("quizData", JSON.stringify(data));
      localStorage.setItem("topic", topic);
      localStorage.setItem("name", name);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
