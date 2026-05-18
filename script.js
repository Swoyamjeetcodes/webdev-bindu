var likeButtons = document.querySelectorAll(".like");

likeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active") ? "♥" : "♡";
  });
});

var scrollButtons = document.querySelectorAll("[data-scroll-target]");

scrollButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var target = document.getElementById(button.getAttribute("data-scroll-target"));
    var direction = Number(button.getAttribute("data-scroll-dir")) || 1;

    if (target) {
      target.scrollBy({
        left: direction * target.clientWidth * 0.85,
        behavior: "smooth"
      });
    }
  });
});

var mouseScrollRows = document.querySelectorAll("[data-scroll-row]");

mouseScrollRows.forEach(function (row) {
  row.addEventListener("wheel", function (event) {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      row.scrollLeft += event.deltaY;
    }
  });
});
