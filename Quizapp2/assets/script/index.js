window.addEventListener("keydown", function (e) {
  if (e.key === "U" || (e.key === "u" && (e.ctrlKey || e.metaKey))) {
    alert("This is a shortcut for the user profile");
    e.preventDefault();
  }
});

let isUserLoggedIn = localStorage.getItem("isUserLoggedIn") || false;
if (isUserLoggedIn) {
  const loggedInButtons = document.getElementById("login");
  loggedInButtons.style.display = "none";
} else {
  const loggedInButtons = document.getElementById("logout");
  const quizButton = document.getElementById("quiz");
  loggedInButtons.style.display = "none";
  quizButton.style.display = "none";
}

function logout() {
  localStorage.removeItem("isUserLoggedIn");
  window.location.href = "index.html";
}
