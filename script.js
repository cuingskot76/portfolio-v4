// hamburger menu
const hamburger = document.querySelector(".ham");
const navLinks = document.querySelector(".nav-links");
const linksList = document.querySelectorAll(".nav-links li");
const linksListA = document.querySelectorAll(".nav-links li a");
const hamburgerLines = document.querySelectorAll(".ham .line");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  hamburgerLines.forEach((line) => {
    line.classList.toggle("active");
  });

  navLinks.classList.toggle("open");

  linksList.forEach((link) => {
    link.classList.toggle("fade");

    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      hamburgerLines.forEach((line) => {
        line.classList.remove("active");
      });
      linksList.forEach((link) => {
        link.classList.remove("fade");
      });
    });
  });

  // remove active class when user click oustside nav
  window.addEventListener("click", function (e) {
    if (e.target !== navLinks && e.target !== hamburger) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      hamburgerLines.forEach((line) => {
        line.classList.remove("active");
      });
      linksList.forEach((link) => {
        link.classList.remove("fade");
      });
    }
  });
});

// toggle active link
linksListA.forEach((link) => {
  link.addEventListener("click", function (e) {
    linksListA.forEach((link) => link.classList.remove("active"));
    link.classList.toggle("active");
  });
});

// navbar scroll
const nav = document.querySelector(".navbar");
const navHeight = nav.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    nav.classList.add("fixed");
  } else {
    nav.classList.remove("fixed");
  }
});

// running text
const text = document.querySelector(".hero__text__second-text");
const phrases = ["Student", "Web Developer", "Freelancer", "Designer"];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

const runText = () => {
  isEnd = false;
  text.innerHTML = currentPhrase.join("");

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      text.innerHTML = currentPhrase.join("");
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j]);
      j--;
      text.innerHTML = currentPhrase.join("");
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
      text.classList.add("blink");
    }

    if (isDeleting && j === 0) {
      text.classList.remove("blink");
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        text.classList.remove("blink");
        i = 0;
      }
    }
  }
  const spedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (300 - 200) + 200;
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
  setTimeout(runText, time);
};

runText();

// loader
// const startTransition = () => {
//   const loader = document.querySelector(".loader");
//   loader.classList.add("loader__active");
//   setTimeout(() => {
//     loader.classList.remove("loader__active");
//   }, 1000);
// };

// window.addEventListener("load", () => {
//   startTransition();
// });

// create dark mode
const theme = document.querySelectorAll(".dark__toggle");
// const heroGradient = document.querySelector(".blue__gradient-5");
// const socialMediaGradient = document.querySelector(
//   ".blue__gradient__social-media"
// );
// const testimonialsGradient = document.querySelector(".blue__gradient-3");

theme.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    // heroGradient.classList.toggle("blue__gradient-5");
    // socialMediaGradient.classList.toggle("blue__gradient__social-media");
    // testimonialsGradient.classList.toggle("blue__gradient-3");
    // startTransition();
    console.log("clicked");
  });
});
