// ─────────────────────────────────────────────
// lang.js — Shared language state across all pages
// Saves and reads selected language from localStorage
// so it persists when farmer navigates between pages
// ─────────────────────────────────────────────

import { translations } from "./translations.js";

const LANG_KEY = "sd_lang";
let pageTranslations = {};

// Get saved language or default to "en"
export function getSavedLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

// Save language to localStorage
export function saveLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

// Set page-specific translations
export function setPageTranslations(t) {
  pageTranslations = t;
}

// Helper to get translation by path
export function getT(path, lang) {
  const currentLang = lang || getSavedLang();
  // Try page-specific first, then common
  const value = path.split(".").reduce((acc, key) => acc?.[key], pageTranslations[currentLang]) 
                || path.split(".").reduce((acc, key) => acc?.[key], translations[currentLang]);
  return value;
}

// Apply language class to body and translate DOM
export function applyLang(lang) {
  document.body.className = document.body.className
    .replace(/lang-\w+/g, "")
    .trim();
  document.documentElement.lang = lang;
  document.body.classList.add("lang-" + lang);
  
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getT(el.dataset.i18n, lang);
    if (value === undefined || value === null) return;
    
    if (el.dataset.i18nHtml === "true") {
      el.innerHTML = value;
      return;
    }
    
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
    } else {
        el.textContent = value;
    }
  });
  updateLangButtons(lang);
}

// Update the language toggle buttons to show correct active state
// Syncs both the desktop (#lang) and mobile nav (#lang-mobile) switchers
export function updateLangButtons(lang) {
  document.querySelectorAll("#lang button[data-lang], #lang-mobile button[data-lang]").forEach((button) => {
    if (button.dataset.lang === lang) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

