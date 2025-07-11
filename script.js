// Mobile Navigation Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(9, 9, 11, 0.95)";
  } else {
    navbar.style.background = "rgba(9, 9, 11, 0.8)";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".about-content, .stat-item, .portfolio-card, .service-card, .talk-card, .section-header",
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".blur-circle");
  const speed = 0.5;

  parallaxElements.forEach((element) => {
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  }

  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const text = stat.textContent;
          const number = parseInt(text.replace(/[^0-9]/g, ""));
          if (number && !stat.classList.contains("animated")) {
            stat.classList.add("animated");
            animateCounter(stat, number);
          }
        });
      }
    });
  },
  { threshold: 0.5 },
);

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

// Enhanced mobile menu functionality
const toggleMobileMenu = () => {
  const navLinks = document.querySelector(".nav-links");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");

  if (navLinks && mobileToggle) {
    // Create mobile menu overlay
    if (!document.querySelector(".mobile-menu-overlay")) {
      const overlay = document.createElement("div");
      overlay.className = "mobile-menu-overlay";
      overlay.innerHTML = `
                <div class="mobile-menu-content">
                    <a href="#sobre" class="mobile-nav-link">Sobre</a>
                    <a href="#portfolio" class="mobile-nav-link">Portfólio</a>
                    <a href="#servicos" class="mobile-nav-link">Serviços</a>
                    <a href="#palestras" class="mobile-nav-link">Palestras</a>
                    <a href="#contato" class="mobile-nav-button">Entre em Contato</a>
                </div>
            `;
      document.body.appendChild(overlay);

      // Add styles for mobile menu
      const style = document.createElement("style");
      style.textContent = `
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(9, 9, 11, 0.95);
                    backdrop-filter: blur(12px);
                    z-index: 9999;
                    display: none;
                    align-items: center;
                    justify-content: center;
                }
                
                .mobile-menu-overlay.active {
                    display: flex;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .mobile-menu-content {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    text-align: center;
                    padding: 40px;
                }
                
                .mobile-nav-link {
                    color: #F5F5F5;
                    text-decoration: none;
                    font-size: 24px;
                    font-weight: 400;
                    transition: color 0.3s ease;
                }
                
                .mobile-nav-link:hover {
                    color: #A78BFA;
                }
                
                .mobile-nav-button {
                    background: #09090B;
                    border: 1px solid #9F75DF;
                    color: #F5F5F5;
                    padding: 16px 24px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .mobile-nav-button:hover {
                    background: #9F75DF;
                    color: #09090B;
                }
                
                .mobile-menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
      document.head.appendChild(style);
    }

    const overlay = document.querySelector(".mobile-menu-overlay");

    mobileToggle.addEventListener("click", () => {
      overlay.classList.toggle("active");
      mobileToggle.classList.toggle("active");
      document.body.style.overflow = overlay.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking on links
    overlay.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("mobile-nav-link") ||
        e.target.classList.contains("mobile-nav-button")
      ) {
        overlay.classList.remove("active");
        mobileToggle.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking overlay
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
        mobileToggle.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
};

// Initialize mobile menu when DOM is loaded
document.addEventListener("DOMContentLoaded", toggleMobileMenu);

// Form validation and WhatsApp integration
function openWhatsApp() {
  const phoneNumber = "5511999999999"; // Replace with actual phone number
  const message = encodeURIComponent(
    "Olá! Gostaria de conversar sobre serviços de design.",
  );
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappURL, "_blank");
}

// Add click handlers for WhatsApp buttons
document.addEventListener("DOMContentLoaded", () => {
  const whatsappButtons = document.querySelectorAll(
    'a[href*="wa.me"], a[href="#contato"]',
  );
  whatsappButtons.forEach((button) => {
    if (
      button.href.includes("#contato") &&
      button.textContent.includes("WhatsApp")
    ) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        openWhatsApp();
      });
    }
  });
});

// Email functionality
function openEmail() {
  const email = "contato@picolodesign.com";
  const subject = encodeURIComponent("Interesse em Serviços de Design");
  const body = encodeURIComponent(
    "Olá Picolo,\n\nGostaria de conversar sobre serviços de design.\n\nObrigado!",
  );
  const mailtoURL = `mailto:${email}?subject=${subject}&body=${body}`;
  window.location.href = mailtoURL;
}

// Add click handlers for email buttons
document.addEventListener("DOMContentLoaded", () => {
  const emailButtons = document.querySelectorAll('a[href*="mailto"]');
  emailButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      openEmail();
    });
  });
});

// Performance optimization: Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
});

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (scrollButton) {
    if (window.pageYOffset > 300) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  }
});

// Add scroll to top button if it doesn't exist
document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".scroll-to-top")) {
    const scrollButton = document.createElement("button");
    scrollButton.className = "scroll-to-top";
    scrollButton.innerHTML = "↑";
    scrollButton.setAttribute("aria-label", "Scroll to top");
    scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 25px;
            background: linear-gradient(135deg, #9F75DF, #A78BFA);
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(159, 117, 223, 0.3);
        `;

    scrollButton.addEventListener("click", scrollToTop);
    scrollButton.addEventListener("mouseenter", () => {
      scrollButton.style.transform = "translateY(-2px)";
      scrollButton.style.boxShadow = "0 6px 20px rgba(159, 117, 223, 0.4)";
    });
    scrollButton.addEventListener("mouseleave", () => {
      scrollButton.style.transform = "translateY(0)";
      scrollButton.style.boxShadow = "0 4px 15px rgba(159, 117, 223, 0.3)";
    });

    document.body.appendChild(scrollButton);
  }
});
