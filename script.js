// Navbar Scroll Effect
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// Category Buttons (Top Section)
document.querySelectorAll("[data-category]").forEach(btn => {
    btn.addEventListener("click", () => {
        let category = btn.getAttribute("data-category").toLowerCase().trim();

        // Fix mismatch issue (very important)
        if (category === "pvc pipes") category = "pipes";
        if (category === "tiles") category = "tiles";
        if (category === "cement") category = "cement";
        if (category === "steel") category = "steel";
        if (category === "paint") category = "paint";

        // Update active state in product filter buttons
        filterButtons.forEach(b => b.classList.remove("active"));
        const matchingFilterBtn = document.querySelector(`[data-filter="${category}"]`);
        if (matchingFilterBtn) matchingFilterBtn.classList.add("active");

        // Apply filter
        applyFilter(category);

        // Smooth scroll to products section
        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
});






// Product Filtering
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

// ✅ Default: show only the first button category on page load
window.addEventListener("DOMContentLoaded", () => {
    const firstBtn = filterButtons[0]; // your first button = cement
    const defaultFilter = firstBtn.getAttribute("data-filter");

    // set active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    firstBtn.classList.add("active");

    // apply default filter
    applyFilter(defaultFilter);
});

// Button click event
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        applyFilter(filterValue);
    });
});


// Contact Form Submission Mock
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic Validation (HTML5 handles most)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const material = document.getElementById('material').value;

        if (name && email) {
            // Simulate API call
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




// Pause carousel on hover
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




document.addEventListener("DOMContentLoaded", function(){

  const wpBtn = document.getElementById("whatsappBtn");

  // Initially hidden
  wpBtn.classList.add("whatsapp-hidden");

  // Show after 5 seconds
  setTimeout(() => {
      wpBtn.classList.remove("whatsapp-hidden");
      wpBtn.classList.add("whatsapp-show");
  }, 5000);

  // Hide if no interaction for 5 seconds
  let inactivityTimer;

  function resetTimer(){
      wpBtn.classList.remove("whatsapp-hidden");
      wpBtn.classList.add("whatsapp-show");

      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
          wpBtn.classList.remove("whatsapp-show");
          wpBtn.classList.add("whatsapp-hidden");
      }, 5000);
  }

  // Detect interaction
  document.addEventListener("click", resetTimer);
  document.addEventListener("scroll", resetTimer);
  document.addEventListener("mousemove", resetTimer);

});




document.addEventListener("DOMContentLoaded", () => {
  const wpBtn = document.getElementById("whatsappBtn");
  if (!wpBtn) return;

  const SHOW_AFTER_MS = 5000;      // show after 5s
  const HIDE_AFTER_IDLE_MS = 5000; // hide after 5s idle

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

  setTimeout(showBtn, SHOW_AFTER_MS);

  ["click","scroll","mousemove","touchstart","keydown"].forEach(evt => {
    document.addEventListener(evt, showBtn, { passive: true });
  });
});
