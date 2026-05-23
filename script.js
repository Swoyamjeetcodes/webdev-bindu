var likeButtons = document.querySelectorAll(".like");

likeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active") ? "♥" : "♡";
  });
});

var heroTrack = document.getElementById("heroTrack");
var heroSlides = heroTrack ? Array.from(heroTrack.querySelectorAll("img")) : [];
var heroDots = Array.from(document.querySelectorAll(".slider-dots span"));
var heroButtons = document.querySelectorAll("[data-hero-dir]");
var activeHeroSlide = 0;

function showHeroSlide(nextIndex) {
  if (!heroSlides.length) {
    return;
  }

  activeHeroSlide = (nextIndex + heroSlides.length) % heroSlides.length;

  heroSlides.forEach(function (slide, index) {
    slide.classList.toggle("active", index === activeHeroSlide);
  });

  heroDots.forEach(function (dot, index) {
    dot.classList.toggle("active", index === activeHeroSlide);
  });
}

heroButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var direction = Number(button.getAttribute("data-hero-dir")) || 1;
    showHeroSlide(activeHeroSlide + direction);
  });
});

var scrollButtons = document.querySelectorAll("[data-scroll-target]");

scrollButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var target = document.getElementById(button.getAttribute("data-scroll-target"));
    var direction = Number(button.getAttribute("data-scroll-dir")) || 1;

    if (target) {
      target.scrollBy({
        left: direction * target.clientWidth * 1.25,
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

function getCoverflowItems(rail) {
  var scopedItems = rail.querySelectorAll(":scope > article, :scope > .craft-link-tile");
  if (scopedItems.length) {
    return Array.from(scopedItems);
  }
  return Array.from(rail.querySelectorAll("article, .craft-link-tile"));
}

function setCoverflowActive(rail, nextActive) {
  var items = getCoverflowItems(rail);
  items.forEach(function (item) {
    item.classList.toggle("coverflow-active", item === nextActive);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var coverflowRails = document.querySelectorAll(".top-picks-rail");

  coverflowRails.forEach(function (rail) {
    var items = getCoverflowItems(rail);
    if (!items.length) {
      return;
    }

    var centerIndex = Math.floor(items.length / 2);
    setCoverflowActive(rail, items[centerIndex]);

    var centerItem = items[centerIndex];
    if (centerItem) {
      requestAnimationFrame(function () {
        var targetLeft = centerItem.offsetLeft + centerItem.offsetWidth / 2 - rail.clientWidth / 2;
        rail.scrollLeft = Math.max(0, targetLeft);
      });
    }

    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        setCoverflowActive(rail, item);
      });
    });
  });

  var storyImage = document.querySelector(".story-image");
  var storyTitle = document.querySelector(".story-title");
  var storyDesc = document.querySelector(".story-desc");
  var storyNextButton = document.querySelector(".story-next");

  if (storyImage && storyTitle && storyDesc && storyNextButton) {
    var stories = [
      {
        image: "public/images/home-story.jpg",
        alt: "Folk painting story artwork",
        title: "The story of Navagunjara",
        desc: "A mythical creature from Odisha folklore"
      },
      {
        image: "public/images/home-painting.jpg",
        alt: "Painted folk art story",
        title: "Colors of Pattachitra",
        desc: "Painted tales layered with myth and rhythm"
      }
    ];

    var activeStory = 0;

    function showStory(index) {
      activeStory = (index + stories.length) % stories.length;
      var nextStory = stories[activeStory];
      storyImage.src = nextStory.image;
      storyImage.alt = nextStory.alt;
      storyTitle.textContent = nextStory.title;
      storyDesc.textContent = nextStory.desc;
    }

    storyNextButton.addEventListener("click", function () {
      showStory(activeStory + 1);
    });
  }
});
