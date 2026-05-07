import { getSavedLang, saveLang, applyLang, updateLangButtons, getT } from "./lang.js";

document.addEventListener("DOMContentLoaded", () => {
  let lang = getSavedLang();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "PRO-XXXX";
  const name = params.get("name") || "";

  function fillDynamic() {
    const elId = document.getElementById("order-id");
    if (elId) elId.textContent = id;
    
    const sub = document.querySelector(".confirm-sub");
    if (sub) {
      let txt = getT("confirm.sub", lang);
      txt = txt.replace("{name}", name).replace("{id}", id);
      sub.textContent = txt;
    }

    const list = document.getElementById("next-steps-list");
    if (list) {
      const steps = getT("confirm.next", lang) || [];
      list.innerHTML = steps.map(s => `<li>${s}</li>`).join("");
    }
  }

  function updateWA() {
    const msg = encodeURIComponent(getT("common.waMsg", lang));
    const link = document.getElementById("wa-link");
    if (link) link.href = `https://wa.me/919727007431?text=${msg}`;
  }

  function render() {
    applyLang(lang);
    updateLangButtons(lang);
    fillDynamic();
    updateWA();
  }

  const langEl = document.getElementById("lang");
  if (langEl) {
    langEl.onclick = e => {
        const btn = e.target.closest("button");
        if (!btn) return;
        lang = btn.dataset.lang;
        saveLang(lang);
        render();
    };
  }

  render();
});
