// core UI handlers: nav toggle, modals, smooth links, form demo
document.addEventListener("DOMContentLoaded", () => {
  // set year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const showing = navLinks.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", showing ? "true" : "false");
      navToggle.classList.toggle("active");
    });
    // close nav after clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.classList.remove("active");
        }
      });
    });
  }

  // Smooth scroll for anchors (works for modern browsers)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // modal open/close - looks for data-modal attribute on buttons
  document.querySelectorAll("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal");
      openModal(document.getElementById(id));
    });
  });

  // resume button opens resume modal
  const resumeBtn = document.getElementById("resumeBtn");
  const resumeSectionBtn = document.getElementById("resumeSectionBtn");
  const resumeModal = document.getElementById("resumeModal");

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener("click", () => openModal(resumeModal));
  }
  if (resumeSectionBtn && resumeModal) {
    resumeSectionBtn.addEventListener("click", () => openModal(resumeModal));
  }

  // close buttons (x)
  document.querySelectorAll(".modal .close").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
  });

  // click outside modal content => close
  document.querySelectorAll(".modal").forEach((mod) => {
    mod.addEventListener("click", (e) => {
      if (e.target === mod) closeModal(mod);
    });
  });

  // ESC key closes any open modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal[aria-hidden='false']").forEach((m) => closeModal(m));
    }
  });

  // nav link active highlight
  const navLinksA = document.querySelectorAll(".nav-links a");
  navLinksA.forEach((a) => {
    a.addEventListener("click", () => {
      navLinksA.forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    });
  });
});

// small demo contact form submit
function fakeSend() {
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const msg = document.getElementById("msg")?.value.trim();
  if (!name || !email || !msg) {
    alert("Please fill all fields.");
    return;
  }
  alert("Message sent — I'll reply soon. (Demo)");
  document.getElementById("contactForm")?.reset();
}

// modal helpers
function openModal(modal) {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(modal) {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  // Only enable scrolling again if no other modals open
  const openModals = document.querySelectorAll(".modal[aria-hidden='false']");
  if (openModals.length === 0) {
    document.body.style.overflow = "";
  }
}
