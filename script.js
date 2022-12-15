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

// create active nav link when page is scrolled
const sections = document.querySelectorAll("section");
const navLinksA = document.querySelectorAll(".nav-links a");

const activeLink = (link) => {
  navLinksA.forEach((link) => link.classList.remove("active"));
  link.classList.add("active");
};

navLinksA.forEach((link) => {
  link.addEventListener("click", () => {
    activeLink(link);
  });
});

window.onscroll = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      const target = document.querySelector(`.nav-links a[href="#${id}"]`);
      activeLink(target);
    }
  });
};

//  scroll smoth
navLinksA.forEach((link) => {
  link.addEventListener("click", smothScroll);
});

function smothScroll(e) {
  e.preventDefault();
  const targetId =
    e.currentTarget.getAttribute("href") === "#"
      ? "header"
      : e.currentTarget.getAttribute("href");
  window.scrollTo({
    top: document.querySelector(targetId).offsetTop,
    behavior: "smooth",
  });
}

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

// scroll to section
// const hero = document.querySelector(".hero");
// const about = document.querySelector(".about");
// const skills = document.querySelector(".skills");
// const gallery = document.querySelector(".gallery");
// const contact = document.querySelector(".contact");
// const hidden = document.querySelectorAll(".hidden");

// linksList.forEach((link) => {
//   link.addEventListener("click", () => {
//     if (link.textContent === "About") {
//       startTransition();
//       // hero.classList.add("hidden");
//       // about.classList.remove("hidden");
//       // skills.classList.add("hidden");
//       // gallery.classList.add("hidden");
//       // contact.classList.add("hidden");
//     } else if (link.textContent === "Skills") {
//       startTransition();
//       // hero.classList.add("hidden");
//       // about.classList.add("hidden");
//       // skills.classList.remove("hidden");
//       // gallery.classList.add("hidden");
//       // contact.classList.add("hidden");
//     } else if (link.textContent === "Gallery") {
//       startTransition();
//       // hero.classList.add("hidden");
//       // about.classList.add("hidden");
//       // skills.classList.add("hidden");
//       // gallery.classList.remove("hidden");
//       // contact.classList.add("hidden");
//     } else if (link.textContent === "Contact") {
//       startTransition();
//       // hero.classList.add("hidden");
//       // about.classList.add("hidden");
//       // skills.classList.add("hidden");
//       // gallery.classList.add("hidden");
//       // contact.classList.remove("hidden");
//     } else if (link.textContent === "Home") {
//       startTransition();
//       // hero.classList.remove("hidden");
//       // about.classList.add("hidden");
//       // skills.classList.add("hidden");
//       // gallery.classList.add("hidden");
//       // contact.classList.add("hidden");
//     }
//   });
// });

// link transition
const startTransition = () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader__active");
  setTimeout(() => {
    loader.classList.remove("loader__active");
  }, 1000);
};

window.addEventListener("load", () => {
  startTransition();
});

// testimonials slider
const indicators = document.querySelectorAll(".indicators button");
const card = document.querySelectorAll(".testimonial__content-card");
const prevArrow = document.querySelector(".testimonial__arrow-left");
const nextArrow = document.querySelector(".testimonial__arrow-right");
const maxCards = card.length;

let currentActive = 0;

indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    document.querySelector(".indicators .active").classList.remove("active");
    indicator.classList.add("active");

    card[currentActive].classList.remove("active");
    card[i].classList.add("active");

    currentActive = i;
  });
});

prevArrow.addEventListener("click", () => {
  let prev = currentActive;
  currentActive = currentActive - 1;
  setSlide(prev, currentActive);
});

nextArrow.addEventListener("click", () => {
  let prev = currentActive;
  currentActive = currentActive + 1;
  setSlide(prev, currentActive);
});

const setSlide = (prev, next) => {
  let slide = currentActive;
  if (next > maxCards - 1) {
    slide = 0;
    currentActive = 0;
  }
  if (next < 0) {
    slide = maxCards - 1;
    currentActive = maxCards - 1;
  }
  document.querySelector(".indicators .active").classList.remove("active");
  indicators[slide].classList.add("active");

  card[prev].classList.remove("active");
  card[slide].classList.add("active");

  // currentActive = slide;
};

// auto slides
setInterval(() => {
  document.querySelector(".indicators .active").classList.remove("active");
  indicators[(currentActive + 1) % card.length].classList.add("active");

  card[currentActive].classList.remove("active");

  currentActive = (currentActive + 1) % card.length;

  card[currentActive].classList.add("active");
}, 7000);

// create dark mode
const theme = document.querySelectorAll(".dark__toggle");
const heroGradient = document.querySelector(".blue__gradient-5");
const socialMediaGradient = document.querySelector(
  ".blue__gradient__social-media"
);
const testimonialsGradient = document.querySelector(".blue__gradient-3");
// const imgAboutGradient = document.querySelector(".green__gradient");

theme.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    heroGradient.classList.toggle("blue__gradient-5");
    socialMediaGradient.classList.toggle("blue__gradient__social-media");
    // imgAboutGradient.classList.toggle("green__gradient");
    testimonialsGradient.classList.toggle("blue__gradient-3");
    startTransition();
  });
});
