// ==========================
// Hamburger Menu Toggle
// ==========================
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// ==========================
// Theme Toggle (Dark / Light)
// ==========================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = "☀️";
} else {
    body.classList.add('light');
    themeToggle.textContent = "🌙";
}

// Toggle function
function toggleTheme() {
    if (body.classList.contains('light')) {
        body.classList.replace('light', 'dark');
        themeToggle.textContent = "☀️";
        localStorage.setItem('theme', 'dark');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
        themeToggle.setAttribute('aria-pressed', 'true');
    } else {
        body.classList.replace('dark', 'light');
        themeToggle.textContent = "🌙";
        localStorage.setItem('theme', 'light');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        themeToggle.setAttribute('aria-pressed', 'false');
    }
}

// Keyboard accessibility
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

themeToggle.addEventListener('click', toggleTheme);

// ==========================
// Intersection Observer for Animations
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('in-view');
        });
    }, observerOptions);

    // Observe all sections, project cards, and contact info containers
    document.querySelectorAll('section, .details-container, .project-img, .contact-info-container').forEach(el => {
        revealObserver.observe(el);
    });
});
