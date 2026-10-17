
// CREATE FLOATING PARTICLES

const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 55; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 5 + Math.random() * 12 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.opacity = Math.random() * 0.8;

    const size = 1 + Math.random() * 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particlesContainer.appendChild(particle);
}

// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// INTERACTIVE 3D CAN

const can = document.getElementById("can");
const productArea = document.getElementById("productArea");

productArea.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 900) return;

    const rect = productArea.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 35;
    const rotateX = (0.5 - y) * 20;

    can.style.animation = "none";
    can.style.transform =
        "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg) translateZ(15px)";
});

productArea.addEventListener("mouseleave", () => {
    can.style.animation = "";
    can.style.transform = "";
});

// ACTIVATE ENERGY EXPERIENCE

const energyBtn = document.getElementById("energyBtn");

energyBtn.addEventListener("click", () => {
    document.body.classList.toggle("energy-mode");

    const active = document.body.classList.contains("energy-mode");

    energyBtn.textContent = active
        ? "ENERGY ACTIVATED ✓"
        : "ACTIVATE EXPERIENCE ⚡";

    document.documentElement.style.setProperty(
        "--cyan",
        active ? "#ff2638" : "#00e5ff"
    );

    document.documentElement.style.setProperty(
        "--blue",
        active ? "#ff2638" : "#087cff"
    );

    if (active) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

// BUTTON SCROLL EFFECT

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// SIMPLE REVEAL EFFECT

const revealElements = document.querySelectorAll(
    ".feature-card, .energy-section h2, .experience-section h2"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
});

const revealStyle = document.createElement("style");

document.head.appendChild(revealStyle);

revealStyle.textContent =
    ".reveal {\n" +
    "    opacity: 0;\n" +
    "    transform: translateY(25px);\n" +
    "    transition: opacity 0.7s ease, transform 0.7s ease;\n" +
    "}\n\n" +
    ".reveal.visible {\n" +
    "    opacity: 1;\n" +
    "    transform: translateY(0);\n" +
    "}\n\n" +
    "@media (prefers-reduced-motion: reduce) {\n" +
    "    .reveal {\n" +
    "        opacity: 1;\n" +
    "        transform: none;\n" +
    "        transition: none;\n" +
    "    }\n" +
    "}\n";
