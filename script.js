var likeButtons = document.querySelectorAll(".like");

likeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active") ? "♥" : "♡";
  });
});
