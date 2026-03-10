/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* =========================
   CATEGORY BUTTONS (TOP SECTION)
   ========================= */
document.querySelectorAll("[data-category]").forEach(btn => {
  btn.addEventListener("click", () => {
    let category = btn.getAttribute("data-category").toLowerCase().trim();

    if (category === "pvc pipes") category = "pipes";
    if (category === "tiles") category = "tiles";
    if (category === "cement") category = "cement";
    if (category === "steel") category = "steel";
    if (category === "paint") category = "paint";

    filterButtons.forEach(b => b.classList.remove("active"));
    const matchingFilterBtn = document.querySelector(`[data-filter="${category}"]`);
    if (matchingFilterBtn) matchingFilterBtn.classList.add("active");

    applyFilter(category);

    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

/* =========================
   PRODUCT FILTERING
   ========================= */
const filterButtons = document.querySelectorAll('[data-filter]');
const productItems = document.querySelectorAll('.product-item');

function applyFilter(filterValue) {
  productItems.forEach(item => {
    if (item.classList.contains(filterValue)) {
      item.style.display = 'block';
      item.classList.add('animate__animated', 'animate__fadeIn');
    } else {
      item.style.display = 'none';
      item.classList.remove('animate__animated', 'animate__fadeIn');
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (filterButtons.length > 0) {
    const firstBtn = filterButtons[0];
    const defaultFilter = firstBtn.getAttribute("data-filter");

    filterButtons.forEach(btn => btn.classList.remove("active"));
    firstBtn.classList.add("active");
    applyFilter(defaultFilter);
  }
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');
    applyFilter(filterValue);
  });
});

/* =========================
   CONTACT FORM SUBMISSION MOCK
   ========================= */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const material = document.getElementById('material')?.value;

    if (name && email) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(`Thank you, ${name}! We have received your inquiry regarding ${material !== 'Select Material...' ? material : 'our products'}. We will contact you at ${email} shortly.`);
        contactForm.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }, 1500);
    }
  });
}

/* =========================
   TESTIMONIAL CAROUSEL PAUSE ON HOVER
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const carouselEl = document.getElementById("testiCarousel");
  if (!carouselEl) return;

  const carousel = new bootstrap.Carousel(carouselEl, {
    interval: 3500,
    pause: false
  });

  carouselEl.addEventListener("mouseenter", () => carousel.pause());
  carouselEl.addEventListener("mouseleave", () => carousel.cycle());
});

/* =========================
   WHATSAPP BUTTON SHOW/HIDE
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const wpBtn = document.getElementById("whatsappBtn");
  if (!wpBtn) return;

  const SHOW_AFTER_MS = 5000;
  const HIDE_AFTER_IDLE_MS = 5000;

  let idleTimer;

  function showBtn() {
    wpBtn.classList.remove("whatsapp-hidden");
    wpBtn.classList.add("whatsapp-show");

    clearTimeout(idleTimer);
    idleTimer = setTimeout(hideBtn, HIDE_AFTER_IDLE_MS);
  }

  function hideBtn() {
    wpBtn.classList.remove("whatsapp-show");
    wpBtn.classList.add("whatsapp-hidden");
  }

  wpBtn.classList.add("whatsapp-hidden");
  setTimeout(showBtn, SHOW_AFTER_MS);

  ["click", "scroll", "mousemove", "touchstart", "keydown"].forEach(evt => {
    document.addEventListener(evt, showBtn, { passive: true });
  });
});

/* =========================
   PREMIUM SCROLL ANIMATIONS
   + HERO PARALLAX
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const revealMap = [
    { selector: ".section-title, .title-underline", cls: "reveal-up" },
    { selector: "#about .hover-card", cls: "reveal-zoom" },
    { selector: "#contact .col-lg-6:first-child", cls: "reveal-left" },
    { selector: "#contact .col-lg-6:last-child", cls: "reveal-right" },
    { selector: "#testimonials .testi-card", cls: "reveal-up" },
    { selector: ".ft .col-lg-5", cls: "reveal-left" },
    { selector: ".ft .col-lg-3", cls: "reveal-up" },
    { selector: ".ft .col-lg-4", cls: "reveal-right" }
  ];

  revealMap.forEach(group => {
    document.querySelectorAll(group.selector).forEach((el, index) => {
      el.classList.add(group.cls);
      el.style.transitionDelay = `${index * 0.18}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-show");
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  });

  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-zoom").forEach(el => {
    observer.observe(el);
  });

  /* Hero parallax - content only, no background movement */
  const heroContent = document.querySelector(".hero-content");

  function applyHeroParallax() {
    if (!heroContent) return;

    const scrollY = window.scrollY;
    const heroLimit = 700;

    if (scrollY <= heroLimit) {
      heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
    } else {
      heroContent.style.transform = `translateY(${heroLimit * 0.08}px)`;
    }
  }

  applyHeroParallax();
  window.addEventListener("scroll", applyHeroParallax, { passive: true });
});