// Navbar change on scroll
window.addEventListener('scroll', () => {
  document.querySelector('.navbar')
    .classList.toggle('scrolled', window.scrollY > 50);
});

// Reveal animations
const reveal = selector => {
  const el = document.querySelector(selector);
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 }
  );
  obs.observe(el);
};

// Scrollspy manual
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  reveal('.hero');
  reveal('#about .container');
  reveal('#projects .container');
});
