import { getSavedLang, saveLang, applyLang, updateLangButtons, getT } from "./lang.js";
import { addToCart, updateCartBadge } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js");

  const data = [
    { n: "Pro 100", img: "images/Hand.png", w: "100 kg", dm: "34.8%", m: "65.2%", c: "Cut 2", h: "18 Sep 2025", wr: "6 Layers", p: 950, s: 240 },
    { n: "Max 700", img: "images/bales-Gemini_Generated_Image_jpz8rzjpz8rzjpz8.png", w: "700 kg", dm: "35.1%", m: "64.9%", c: "Cut 2", h: "22 Sep 2025", wr: "8 Layers", p: 5200, s: 84 }
  ];

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

  function buildProds() {
    const el = document.getElementById("prods");
    if (!el) return;
    el.innerHTML = data.map(d => `
      <article class="product-card">
        <div class="product-card-img-wrap">
          <img class="product-card-img" src="${d.img}" alt="${d.n}" width="300" height="300" loading="lazy">
        </div>
        <div class="product-card__body">
          <div class="product-card__top">
            <span class="product-card__fit">${(d.n === "Pro 100" ? getT("product.fitSmall", lang) : getT("product.fitLarge", lang))}</span>
            <h2 class="product-card__name">${d.n}</h2>
          </div>
          <div class="product-card__specs">
            <div class="product-card__spec">
              <div class="spec-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 2h10l1 2H6l1-2Z"/><path d="M3 7h18l-1.5 12h-15L3 7Z"/><path d="M12 7v12"/></svg></div>
              <div class="spec-data"><span class="spec-label">${getT("product.l.w", lang)}</span><span class="spec-value">${d.w}</span></div>
            </div>
            <div class="product-card__spec">
              <div class="spec-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v10"/><path d="m16 8-4-4-4 4"/><path d="M3 22h18"/><path d="M5 22v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/></svg></div>
              <div class="spec-data"><span class="spec-label">${getT("product.l.dm", lang)}</span><span class="spec-value">${d.dm}</span></div>
            </div>
            <div class="product-card__spec">
              <div class="spec-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg></div>
              <div class="spec-data"><span class="spec-label">${getT("product.l.wr", lang)}</span><span class="spec-value">${d.wr}</span></div>
            </div>
            <div class="product-card__spec">
              <div class="spec-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg></div>
              <div class="spec-data"><span class="spec-label">${getT("product.l.s", lang)}</span><span class="spec-value">${d.s}</span></div>
            </div>
          </div>
          <div class="product-card__price">
            <div class="price-box"><strong>₹${d.p.toLocaleString("en-IN")}</strong><small>/bale</small></div>
          </div>
          <div class="product-card__min-order" style="color: var(--clr-text-muted); font-size: 0.85rem; margin-top: 12px; display: flex; align-items: center; gap: 6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            <span>${d.n === "Pro 100" ? "Minimum 12 bales &mdash; Starting from ₹10,800" : "Minimum 3 bales &mdash; Starting from ₹15,600"}</span>
          </div>
          <div class="product-card__actions" style="margin-top: 12px;">
            <div class="qty-selector" style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px; background: var(--clr-bg-cream); padding: 6px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
               <button class="qty-minus" style="border:none; background:transparent; font-size:1.2rem; cursor:pointer; color:var(--clr-primary); width: 30px; font-weight: bold;" aria-label="Decrease quantity">-</button>
               <input type="number" class="qty-input" value="${d.n === 'Pro 100' ? 12 : 3}" min="${d.n === 'Pro 100' ? 12 : 3}" style="width: 60px; text-align: center; border: 1px solid var(--clr-border); border-radius: 4px; padding: 4px; font-weight: 600;">
               <button class="qty-plus" style="border:none; background:transparent; font-size:1.2rem; cursor:pointer; color:var(--clr-primary); width: 30px; font-weight: bold;" aria-label="Increase quantity">+</button>
            </div>
            <div class="min-qty-err" style="display:none; color: #a93226; font-size: 0.8rem; text-align: center; margin-bottom: 8px;"></div>
            <button class="btn-premium add-cart-btn" data-name="${d.n}" data-weight="${d.w}" data-price="${d.p}">
              🛒 ${getT("product.addCart", lang)}
            </button>
            <a href="https://wa.me/919727007431?text=${encodeURIComponent(getT("product.waMsgPrefix", lang) + d.n)}" 
               target="_blank" rel="noopener noreferrer" class="wa-link-premium">${getT("product.add", lang)}</a>
          </div>
        </div>
      </article>`).join("");

    document.querySelectorAll(".product-card").forEach(card => {
      const minus = card.querySelector(".qty-minus");
      const plus = card.querySelector(".qty-plus");
      const input = card.querySelector(".qty-input");
      const addBtn = card.querySelector(".add-cart-btn");
      const err = card.querySelector(".min-qty-err");
      const minQty = addBtn.dataset.name === "Pro 100" ? 12 : 3;

      const checkQty = (val) => {
        if (val < minQty) {
          err.textContent = `Minimum order for ${addBtn.dataset.name} is ${minQty} bales`;
          err.style.display = "block";
          return false;
        }
        err.style.display = "none";
        return true;
      };

      minus.onclick = () => {
        const val = parseInt(input.value, 10) || 0;
        if (val > 1) input.value = val - 1;
        checkQty(parseInt(input.value, 10));
      };
      plus.onclick = () => {
        const val = parseInt(input.value, 10) || 0;
        input.value = val + 1;
        checkQty(parseInt(input.value, 10));
      };
      input.oninput = () => checkQty(parseInt(input.value, 10) || 0);

      addBtn.onclick = () => {
        const qty = parseInt(input.value, 10) || 0;
        if (!checkQty(qty)) return;

        addToCart({ name: addBtn.dataset.name, weight: addBtn.dataset.weight, price: Number(addBtn.dataset.price), qty });
        const original = addBtn.textContent;
        addBtn.textContent = "✓ Added!";
        updateCartBadge();
        setTimeout(() => { addBtn.textContent = original; }, 1500);
      };
    });
  }

  function buildUC() {
    const el = document.getElementById("usecases");
    if (!el) return;
    const uc = getT("product.uc", lang) || [];
    el.innerHTML = uc.map(u => `<div class="uc"><div class="uc-icon">${u.i}</div><h3>${u.t}</h3><p>${u.p}</p></div>`).join("");
  }

  function buildCmp() {
    const el = document.getElementById("cmptable");
    if (!el) return;
    const c = getT("product.cmp", lang);
    if (!c) return;
    el.innerHTML = `
      <thead>
        <tr>
          ${c.h.map((h, i) => `<th${i === 0 ? ' style="color:var(--clr-text-muted)"' : ''}>${h}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${c.rows.map(r => `<tr>${r.map((v, i) => `<td${i > 0 ? ` class="${v === "✓" ? "check" : v === "✗" ? "cross" : ""}"` : ''}>${v}</td>`).join("")}</tr>`).join("")}
      </tbody>`;
  }

  function buildPrice() {
    const el = document.getElementById("ptable");
    if (!el) return;
    const pr = getT("product.priceRows", lang);
    if (!pr) return;
    el.innerHTML = `
      <thead>
        <tr>
          ${pr.h.map(h => `<th>${h}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${pr.r.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="hi">${r[2]}</td><td style="color:${r[3] === "—" ? "var(--clr-text-muted)" : "var(--clr-primary)"}">${r[3]}</td></tr>`).join("")}
      </tbody>`;
  }

  function updateWA() {
    const msg = encodeURIComponent(getT("common.waMsg", lang));
    ["wa-link", "wa-order"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = `https://wa.me/919727007431?text=${msg}`;
    });
  }

  function render() {
    applyLang(lang);
    buildProds();
    buildUC();
    buildCmp();
    buildPrice();
    updateWA();
    updateLangButtons(lang);
  }

  function setLang(l) {
    lang = l;
    saveLang(l);
    document.body.classList.add("fade");
    setTimeout(() => {
      render();
      document.body.classList.remove("fade");
    }, 150);
  }

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      const l = button.dataset.lang;
      if (l) setLang(l);
    });
  });

  window.addEventListener("scroll", () => {
    const hdr = document.getElementById("hdr");
    if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in") }), { threshold: .15 });
  document.querySelectorAll(".reveal").forEach(e => io.observe(e));

  render();
  initMobileNav();
  updateCartBadge();
});
