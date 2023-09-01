if (localStorage.getItem("isUserLoggedIn") !== "true") {
  console.log("User is not logged in");
  window.location.href = "index.html";
}
