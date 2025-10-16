// Toggle the hamburger menu visibility using a CSS class
function toggleMenu() {
	const menu = document.querySelector('.menu-links');
	const icon = document.querySelector('.hamburger-icon');
	menu.classList.toggle('open');
	icon.classList.toggle('open');
}


// THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
} else {
    body.classList.add('light');
}

function toggleTheme() {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
}

// Set the correct icon on page load
themeToggle.textContent = body.classList.contains('dark') ? "☀️" : "🌙";
// Set aria attributes on load
themeToggle.setAttribute('aria-pressed', body.classList.contains('dark'));
themeToggle.setAttribute('aria-label', body.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme');

// Allow keyboard toggle (Enter / Space)
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// Update aria attributes inside toggleTheme
const _origToggleTheme = toggleTheme;

// Intersection Observer to reveal elements when they enter the viewport
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Stagger and alternate slide directions for project cards
            if (entry.target.matches('.details-container') || entry.target.matches('.project-img')) {
                // Stagger based on position inside the projects section
                const projectContainers = Array.from(document.querySelectorAll('#projects .about-containers > .details-container'));
                const containerEl = entry.target.closest('.details-container');
                const index = projectContainers.indexOf(containerEl);
                const delay = (index >= 0 ? index * 140 : 0);
                window.setTimeout(() => {
                    entry.target.classList.add('in-view');
                    // always slide from right to left per request
                    entry.target.classList.add('slide-right');
                }, delay);
            } else {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe sections and card-like elements
    document.querySelectorAll('section, .details-container, .project-img, .contact-info-container').forEach(el => {
        revealObserver.observe(el);
    });
});

