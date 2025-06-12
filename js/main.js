// Navbar change on scroll
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

// Reveal animations
const reveal = (selector) => {
  const el = document.querySelector(selector);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
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

document.addEventListener("DOMContentLoaded", () => {
  reveal(".hero");
  reveal("#about .container");
  reveal("#projects .container");
});

async function loadProjects() {
  const container = document.getElementById("projects-container");
  const res = await fetch("https://api.github.com/users/hanungss/repos");
  const repos = await res.json();

  let count = 0;
  const maxProjects = 6; // 4 baris x 3 kolom

  repos.forEach((repo) => {
    if (!repo.fork && count < maxProjects) {
      const col = document.createElement("div");
      col.className = "col-md-4 d-flex";

      col.innerHTML = `
  <a href="${
    repo.html_url
  }" target="_blank" class="text-decoration-none text-dark w-100">
    <div class="card project-card shadow-sm position-relative h-100">
      <div class="github-icon">
        <i class="bi bi-github"></i>
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${repo.name}</h5>
        <p class="card-text flex-grow-1">${
          repo.description || "No description provided."
        }</p>
        <div class="text-end mt-2">
          <i class="bi bi-box-arrow-up-right"></i>
        </div>
      </div>
    </div>
  </a>
`;

      container.appendChild(col);
      count++;
    }
  });
}

document.querySelector(".copy-email")?.addEventListener("click", () => {
  navigator.clipboard.writeText("hanung@email.com");
  alert("Email copied!");
});

const toggle = document.getElementById("darkToggle");
toggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Optional: ganti ikon
  const icon = toggle.querySelector("i");
  icon.classList.toggle("bi-moon");
  icon.classList.toggle("bi-sun");
});

document.addEventListener("DOMContentLoaded", loadProjects);
