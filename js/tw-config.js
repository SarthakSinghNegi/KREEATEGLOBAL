// Shared Tailwind (Play CDN) config for Kreeate Global — "Nexus Elite" design system.
// Colors reference CSS variables (defined in css/styles.css) so light/dark works globally.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        "surface-container-lowest": "var(--sc-lowest)",
        "surface-container-low": "var(--sc-low)",
        "surface-container": "var(--sc)",
        "surface-container-high": "var(--sc-high)",
        "surface-container-highest": "var(--sc-highest)",
        "surface-ink": "var(--surface-ink)",
        primary: "var(--primary)",
        "on-primary": "var(--on-primary)",
        "on-primary-container": "var(--on-primary-container)",
        "primary-fixed": "var(--primary-fixed)",
        "on-primary-fixed": "var(--on-primary-fixed)",
        secondary: "var(--secondary)",
        "on-surface": "var(--on-surface)",
        "accent-subtle": "var(--accent-subtle)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        "display-lg": ["Hanken Grotesk", "sans-serif"],
        "headline-lg": ["Hanken Grotesk", "sans-serif"],
        "headline-md": ["Hanken Grotesk", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-sm": ["JetBrains Mono", "monospace"],
        button: ["Hanken Grotesk", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["72px", { lineHeight: "80px", letterSpacing: "-0.04em", fontWeight: "700" }],
        "headline-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }],
        button: ["14px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "600" }],
      },
      spacing: {
        gutter: "24px",
        "container-max": "1280px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "section-gap": "120px",
        base: "8px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
};
