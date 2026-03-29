// ─────────────────────────────────────────────
// lang.js — Shared language state across all pages
// Saves and reads selected language from localStorage
// so it persists when farmer navigates between pages
// ─────────────────────────────────────────────

const LANG_KEY = "sd_lang";

// Get saved language or default to "en"
export function getSavedLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

// Save language to localStorage
export function saveLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

// Apply language class to body
export function applyLang(lang) {
  document.body.className = document.body.className
    .replace(/lang-\w+/g, "")
    .trim();
  document.body.classList.add("lang-" + lang);
}

// Update the language toggle buttons to show correct active state
export function updateLangButtons(lang) {
  document.querySelectorAll("#lang button").forEach((b, i) => {
    b.classList.toggle("active", ["en", "hi", "gu"][i] === lang);
  });
}