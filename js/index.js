// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

const savedTheme = localStorage.getItem('cwm-theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('cwm-theme', next);
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Current year
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Smooth scroll with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.length < 2) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Scroll reveal
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}