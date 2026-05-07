import { getSavedLang, saveLang, applyLang, updateLangButtons, getT } from "./lang.js";

document.addEventListener("DOMContentLoaded", () => {
  let lang = getSavedLang();

  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("mobile-nav");
    if (!toggle || !menu) return;
    const close = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.onclick = () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) close();
    });
  }

  function buildVals() {
    const el = document.getElementById("vals");
    if (!el) return;
    const vals = getT("about.vals", lang) || [];
    el.innerHTML = vals.map(v => `<div class="vcard"><div class="vicon">${v.i}</div><h3>${v.t}</h3><p>${v.p}</p></div>`).join("");
  }

  function buildPills() {
    const el = document.getElementById("pills");
    if (!el) return;
    const pills = getT("about.promPills", lang) || [];
    el.innerHTML = pills.map(p => `<span class="pill">${p}</span>`).join("");
  }

  function buildTeam() {
    const el = document.getElementById("team");
    if (!el) return;
    const team = getT("about.team", lang) || [];
    el.innerHTML = team.map(m => `
      <div class="tcard">
        <div class="timg-placeholder">${m.i}</div>
        <div class="tinfo">
          <h3>${m.n}</h3>
          <p class="role">${m.r}</p>
          <p class="desc">${m.p}</p>
        </div>
      </div>`).join("");
  }

  function buildTL() {
    const el = document.getElementById("tl");
    if (!el) return;
    const mil = getT("about.mil", lang) || [];
    el.innerHTML = mil.map((m, i) => `
      <div class="tl-item ${i % 2 === 0 ? 'left' : 'right'}">
        <div class="tl-content">
          <div class="tl-year">${m.y}</div>
          <h3>${m.t}</h3>
          <p>${m.p}</p>
        </div>
      </div>`).join("");
  }

  function updateWA() {
    const msg = encodeURIComponent(getT("common.waMsg", lang));
    const link = document.getElementById("wa-link");
    if (link) link.href = `https://wa.me/919727007431?text=${msg}`;
  }

  function render() {
    applyLang(lang);
    buildVals();
    buildPills();
    buildTeam();
    buildTL();
    updateWA();
  }

  function setLang(nextLang) {
    lang = nextLang;
    saveLang(lang);
    applyLang(lang);
    updateLangButtons(lang);
    document.body.classList.add("fade");
    setTimeout(() => {
      render();
      document.body.classList.remove("fade");
    }, 150);
  }

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      setLang(button.dataset.lang);
    });
  });

  window.addEventListener("scroll", () => {
    const hdr = document.getElementById("hdr");
    if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  render();
  initMobileNav();
});
