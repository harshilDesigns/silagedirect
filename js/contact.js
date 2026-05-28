import { getSavedLang, saveLang, applyLang, updateLangButtons, getT } from "./lang.js";

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");
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

  function buildInfo() {
    const el = document.getElementById("infoCards");
    if (!el) return;
    const info = getT("contact.info", lang);
    const cards = [
      { i: "Phone", v: info.phone.v, href: "tel:" + info.phone.v.replace(/\s/g, "") },
      { i: "Email", v: info.mail.v, href: "mailto:" + info.mail.v },
      { i: "Location", v: info.loc.v, href: "https://maps.google.com/?q=Mehsana,Gujarat" }
    ];
    el.innerHTML = cards.map(card => `
      <div class="cinfo-card">
        <div class="cinfo-icon">${card.i[0]}</div>
        <div>
          <h3>${getT("contact.info." + card.i.toLowerCase() + ".l", lang)}</h3>
          <p><a href="${card.href}" target="_blank">${card.v}</a></p>
        </div>
      </div>`).join("");
  }

  function buildHours() {
    const el = document.getElementById("hourRows");
    if (!el) return;
    const hours = getT("contact.hours", lang) || [];
    el.innerHTML = hours.map(h => `<div class="hrow"><span>${h.d}</span><strong>${h.t}</strong></div>`).join("");
  }

  function buildFaq() {
    const box = document.getElementById("faq");
    if (!box) return;
    const items = getT("contact.faq", lang) || [];
    box.innerHTML = items.map(item => `<article class="fi"><button class="fq" type="button"><span>${item.q}</span><span class="plus">+</span></button><div class="fa">${item.a}</div></article>`).join("");
    box.querySelectorAll(".fi").forEach(it => {
      it.querySelector(".fq").onclick = () => {
        const open = it.classList.contains("open");
        box.querySelectorAll(".fi").forEach(node => {
          node.classList.remove("open");
          node.querySelector(".plus").textContent = "+";
        });
        if (!open) {
          it.classList.add("open");
          it.querySelector(".plus").textContent = "-";
        }
      };
    });
  }

  function updateWA() {
    const msg = encodeURIComponent(getT("common.waMsg", lang));
    ["wa-link", "wa-direct"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = `https://wa.me/919727007431?text=${msg}`;
    });
  }

  function buildForm() {
    // Populate Bales Needed select
    const balesSelect = document.getElementById("f-bales");
    if (balesSelect) {
        const options = getT("index.balesOptions", lang) || []; // Reusing index options
        const placeholder = getT("index.formFsel", lang);
        let html = `<option value="">${placeholder}</option>`;
        const values = ["12-24", "25-50", "51-100", "100+"];
        options.forEach((opt, i) => {
            html += `<option value="${values[i]}">${opt}</option>`;
        });
        balesSelect.innerHTML = html;
    }

    // Populate Bale Type select
    const typeSelect = document.getElementById("f-type");
    if (typeSelect) {
        const options = getT("contact.labels.typeOptions", lang) || [];
        let html = `<option value=""></option>`;
        const values = ["Pro 100", "Max 700", "Not sure"];
        options.forEach((opt, i) => {
            html += `<option value="${values[i]}">${opt}</option>`;
        });
        typeSelect.innerHTML = html;
    }
  }

  document.getElementById("f-submit").onclick = () => {
    const name = document.getElementById("f-name").value.trim();
    const phone = document.getElementById("f-phone").value.trim();
    const village = document.getElementById("f-village").value.trim();
    const bales = document.getElementById("f-bales").value;
    const type = document.getElementById("f-type").value;
    const note = document.getElementById("f-msg").value.trim();
    const status = document.getElementById("fstatus");
    if (!name || !phone || phone.length !== 10 || !village) {
      status.className = "form-msg error";
      status.textContent = getT("contact.err", lang);
      return;
    }
    const waMsg = encodeURIComponent(`New Enquiry from Contact Page:\nName: ${name}\nPhone: ${phone}\nVillage: ${village || "-"}\nBales: ${bales || "-"}\nType: ${type || "-"}\nNote: ${note || "-"}`);
    window.open(`https://wa.me/919727007431?text=${waMsg}`, "_blank");
    status.className = "form-msg success";
    status.textContent = getT("contact.ok", lang);
    document.getElementById("f-name").value = "";
    document.getElementById("f-phone").value = "";
    document.getElementById("f-village").value = "";
    document.getElementById("f-bales").value = "";
    document.getElementById("f-type").value = "";
    document.getElementById("f-msg").value = "";
  };

  function render() {
    applyLang(lang);
    updateLangButtons(lang);
    buildInfo();
    buildHours();
    buildFaq();
    updateWA();
    buildForm();
  }

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      lang = button.dataset.lang;
      saveLang(lang);
      document.body.classList.add("fade");
      setTimeout(() => {
        render();
        document.body.classList.remove("fade");
      }, 150);
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
