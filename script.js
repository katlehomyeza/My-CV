// Particle animation
const canvas = document.getElementById("particleCanvas")
const ctx = canvas.getContext("2d")

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resizeCanvas()
window.addEventListener("resize", resizeCanvas)

// Particle system
const particles = []

// Create particles
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
    color: Math.random() > 0.5 ? "#8b5cf6" : "#a855f7",
  })
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.x += particle.vx
    particle.y += particle.vy

    // Bounce off edges
    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

    // Draw particle
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle =
      particle.color +
      Math.floor(particle.opacity * 255)
        .toString(16)
        .padStart(2, "0")
    ctx.fill()
  })

  requestAnimationFrame(animateParticles)
}

animateParticles()

// Navigation functionality
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section[id]")

// Smooth scrolling
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Update active nav link
    navLinks.forEach((l) => l.classList.remove("active"))
    link.classList.add("active")
  })
})

// Update active nav link on scroll
function updateActiveNavLink() {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNavLink)

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log(data);

    // Simple validation
    let isValid = true;
    contactForm.querySelectorAll("input, textarea").forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ef4444";
      } else {
        input.style.borderColor = "";
      }
    });

    if (!isValid) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;


      // Send data to backend
      const response = await fetch("https://my-cv-iqsl.vercel.app/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: data['first_name'],
          last_name: data['last_name'],
          email: data['email'],
          subject: data['subject'],
          message: data['message'],
        }),
      });

      const result = await response.json();

      if (result.success) {
        submitBtn.textContent = "Message Sent!";
        contactForm.reset();
      } else {
        submitBtn.textContent = "Error, try again!";
        console.error(result.error);
      }

    } catch (err) {
      console.error(err);
      submitBtn.textContent = "Error, try again!";
    }

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}


// Add staggered animation delays to skill cards
const skillCards = document.querySelectorAll(".skill-card")
skillCards.forEach((card, index) => {
  card.style.setProperty("--i", index)
})

// Add staggered animation delays to experience cards
const experienceCards = document.querySelectorAll(".experience-card")
experienceCards.forEach((card, index) => {
  card.style.setProperty("--i", index)
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
    }
  })
}, observerOptions)

// Observe animated elements
document.querySelectorAll('[class*="animate-"], .skill-card, .experience-card').forEach((el) => {
  observer.observe(el)
})
