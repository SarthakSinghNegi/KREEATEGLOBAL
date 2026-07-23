/* ============================================================
   Kreeate Global - shared interactions
   ============================================================ */

const WHATSAPP_NUMBER = "919873833190";

/* ---------- Theme (light / dark) ---------- */
function applyTheme(theme) {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    document.querySelectorAll("[data-theme-icon]").forEach((el) => {
        el.textContent = theme === "dark" ? "light_mode" : "dark_mode";
    });
    const meta = document.getElementById("theme-color-meta");
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0e0f12" : "#f8f9fa");
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
}

(function initTheme() {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
})();

/* ---------- Mobile menu ---------- */
function toggleMenu() {
    const menu = document.getElementById("mob-menu");
    if (!menu) return;
    const open = menu.classList.toggle("open");
    document.body.style.overflow = open ? "hidden" : "";
}

function closeMenu() {
    const menu = document.getElementById("mob-menu");
    if (menu) menu.classList.remove("open");
    document.body.style.overflow = "";
}

/* ---------- WhatsApp ---------- */
function contactViaWhatsApp() {
    const msg = encodeURIComponent("Hi Kreeate Global, I'd like to discuss a hiring requirement.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

/* ---------- Wire up after DOM ready ---------- */
document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle buttons
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
    });

    // Menu buttons
    document.querySelectorAll("[data-menu-toggle]").forEach((btn) => btn.addEventListener("click", toggleMenu));
    document.querySelectorAll("#mob-menu a").forEach((a) => a.addEventListener("click", closeMenu));

    // Sticky nav shrink
    const nav = document.getElementById("site-nav");
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 40) {
                nav.classList.add("h-16", "shadow-sm");
                nav.classList.remove("h-20");
            } else {
                nav.classList.add("h-20");
                nav.classList.remove("h-16", "shadow-sm");
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    // Scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealEls.forEach((el) => obs.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("in"));
    }

    // Floating WhatsApp button (injected once)
    if (!document.querySelector(".wa-fab")) {
        const fab = document.createElement("button");
        fab.className = "wa-fab";
        fab.setAttribute("aria-label", "Chat on WhatsApp");
        fab.addEventListener("click", contactViaWhatsApp);
        fab.innerHTML =
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
        document.body.appendChild(fab);
    }
});
