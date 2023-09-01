document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "sg123.98@sg.com" && password === "sg123.98") {
    localStorage.setItem("isUserLoggedIn", true);
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials, please try again");
  }
});

function logout() {
  localStorage.removeItem("isUserLoggedIn");
  window.location.href = "index.html";
  alert("You have been logged out");
}
