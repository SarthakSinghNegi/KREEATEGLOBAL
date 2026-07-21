const WHATSAPP_NUMBER = '919873833190';

/* ===== Theme (dark / light) ===== */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (sun && moon) {
        sun.style.display = theme === 'dark' ? 'none' : 'block';
        moon.style.display = theme === 'dark' ? 'block' : 'none';
    }
    const meta = document.getElementById('theme-color-meta');
    if (meta) {
        meta.setAttribute('content', theme === 'dark' ? '#0C0C14' : '#FFFFFF');
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
}

(function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

/* ===== Mobile menu ===== */
function toggleMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mob-menu');
    const open = menu.classList.toggle('on');
    burger.classList.toggle('on', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
    document.getElementById('burger').classList.remove('on');
    document.getElementById('mob-menu').classList.remove('on');
    document.body.style.overflow = '';
}

/* ===== Modals ===== */
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

/* ===== WhatsApp ===== */
function contactViaWhatsApp() {
    const message = "Hi Kreeate Global, I'm interested in your recruitment services.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

/* ===== Smooth scroll ===== */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#' && !this.onclick) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href').substring(1));
        }
    });
});

/* ===== Scroll progress bar + sticky nav ===== */
const progressBar = document.getElementById('scroll-progress');
const siteHeader = document.getElementById('site-header');

window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    if (progressBar) {
        progressBar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
    }
    if (siteHeader) {
        siteHeader.classList.toggle('stuck', scrolled > 50);
    }
});

/* ===== Animated counters ===== */
function animateCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseInt(el.dataset.to, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.signal-number[data-to]').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const trustSection = document.getElementById('trust-signals');
if (trustSection) counterObserver.observe(trustSection);

/* ===== Scroll reveal ===== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});
