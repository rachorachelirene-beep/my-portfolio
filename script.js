/* ===========================================================
   EDIT THESE LINKS FIRST.
   Keep the value as an empty string ("") to hide an unused link.
   Example: email: "rachel@example.com"
   =========================================================== */

const portfolioLinks = {
  email: "ireneracho2005@gmail.com",
  github: "https://github.com/rachorachelirene-beep",
  linkedin: "https://www.linkedin.com/in/irene-racho/"
};


// Personal links — only shown once you add the real URLs above.
const emailLink = document.getElementById("email-link");
const unsetContact = document.getElementById("contact-unset");
if (portfolioLinks.email.trim()) {
  emailLink.href = `mailto:${portfolioLinks.email.trim()}?subject=${encodeURIComponent("Hello Rachel! Let's connect")}`;
  emailLink.hidden = false;
  unsetContact.hidden = true;
}
for (const key of ["github", "linkedin"]) {
  const element = document.getElementById(`${key}-link`);
  const value = portfolioLinks[key].trim();
  if (/^https:\/\//i.test(value)) {
    element.href = value;
    element.hidden = false;
  }
}

// Always display the current year.
const thisYear = String(new Date().getFullYear());
for (const id of ["header-year", "hero-year", "footer-year"]) {
  document.getElementById(id).textContent = thisYear;
}

// If the user's original profile.png is not in the folder, show a styled RIR fallback.
const profilePhoto = document.getElementById("profile-photo");
profilePhoto.addEventListener("error", () => {
  profilePhoto.hidden = true;
  document.getElementById("portrait-frame").classList.add("no-photo");
});
if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
  profilePhoto.hidden = true;
  document.getElementById("portrait-frame").classList.add("no-photo");
}

// Theme switch: saves your selection in this browser.
const themeToggle = document.getElementById("theme-toggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
}
let savedTheme = "light";
try { savedTheme = localStorage.getItem("rir-theme") || "light"; } catch (_) {}
applyTheme(savedTheme === "dark" ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try { localStorage.setItem("rir-theme", nextTheme); } catch (_) {}
});

// Accessible mobile menu.
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  siteNav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}
menuToggle.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
siteNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMenuOpen(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) setMenuOpen(false);
});

// Clickable filter chips for the project section.
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];
const filterStatus = document.getElementById("filter-status");
filterButtons.forEach(button => button.addEventListener("click", () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  let visibleCount = 0;
  projectCards.forEach(card => {
    const visible = selected === "all" || card.dataset.category.split(" ").includes(selected);
    card.classList.toggle("is-hidden", !visible);
    card.setAttribute("aria-hidden", String(!visible));
    if (visible) visibleCount++;
  });
  filterStatus.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? "" : "s"}.`;
}));

// Scroll progress and subtle entry animations.
const progressBar = document.getElementById("scroll-progress");
function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-ready");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: "0px 0px 20px 0px" });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

// TriStock screenshot gallery (native accessible dialog, close with Escape or ×).
const triGallery = document.getElementById("tristock-gallery");
const triOpen = document.getElementById("open-tristock-gallery");
const triClose = document.getElementById("close-tristock-gallery");
if (triGallery && triOpen && triClose) {
  triOpen.addEventListener("click", () => triGallery.showModal());
  triClose.addEventListener("click", () => triGallery.close());
  triGallery.addEventListener("click", event => {
    if (event.target === triGallery) triGallery.close();
  });
}


// BarangayConnect: open/close the early UI learning-project screenshot gallery.
const barangayGallery = document.getElementById("barangay-gallery");
const barangayOpen = document.getElementById("open-barangay-gallery");
const barangayClose = document.getElementById("close-barangay-gallery");
if (barangayGallery && barangayOpen && barangayClose) {
  barangayOpen.addEventListener("click", () => barangayGallery.showModal());
  barangayClose.addEventListener("click", () => barangayGallery.close());
  barangayGallery.addEventListener("click", event => {
    if (event.target === barangayGallery) barangayGallery.close();
  });
}



/* ======================================
   ENSURE LINKEDIN LINK IS CLICKABLE
====================================== */

document.addEventListener("DOMContentLoaded", () => {
    const linkedinLink =
        document.getElementById("linkedin-link");

    if (linkedinLink) {
        linkedinLink.href =
            "https://www.linkedin.com/in/irene-racho/";

        linkedinLink.target = "_blank";
        linkedinLink.rel = "noopener noreferrer";
        linkedinLink.hidden = false;
    }
});
