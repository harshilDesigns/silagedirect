import { getSavedLang, saveLang, applyLang, updateLangButtons, getT } from "./lang.js";
import { addToCart, updateCartBadge, showCartToast } from "./cart.js";
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.documentElement.classList.add("js");

  const data = [
    { n: "Pro 100", img: "images/Hand.png", w: "100 kg", dm: "34.8%", m: "65.2%", c: "Cut 2", h: "18 Sep 2025", wr: "6 Layers", p: 950, s: 240, fitKey: "index.fitSmall", decisionKey: "index.decSmall" },
    { n: "Max 700", img: "images/bales-Gemini_Generated_Image_jpz8rzjpz8rzjpz8.png", w: "700 kg", dm: "35.1%", m: "64.9%", c: "Cut 2", h: "22 Sep 2025", wr: "8 Layers", p: 5200, s: 84, fitKey: "index.fitLarge", decisionKey: "index.decLarge" }
  ];

  let lang = getSavedLang();
  const app = document.getElementById("app");
  let firestoreBatch = null;

  async function loadFirestoreData() {
    try {
      const [stockSnap, priceSnap, batchSnap] = await Promise.all([
        getDoc(doc(db, "settings", "stock")),
        getDoc(doc(db, "settings", "prices")),
        getDoc(doc(db, "settings", "batch"))
      ]);
      if (stockSnap.exists()) {
        const st = stockSnap.data();
        data.forEach(d => {
          if (d.n === "Pro 100" && st.pro100 != null) d.s = st.pro100;
          if (d.n === "Max 700" && st.max700 != null) d.s = st.max700;
        });
      }
      if (priceSnap.exists()) {
        const pr = priceSnap.data();
        data.forEach(d => {
          if (d.n === "Pro 100" && pr.pro100?.tier1 != null) d.p = pr.pro100.tier1;
          if (d.n === "Max 700" && pr.max700?.tier1 != null) d.p = pr.max700.tier1;
        });
      }
      if (batchSnap.exists()) {
        firestoreBatch = batchSnap.data();
      }
    } catch (e) {
      console.warn("Firestore fetch failed, using hardcoded values", e);
    }
  }

  function updateHeroBadge() {
    if (!firestoreBatch) return;
    const badge = document.querySelector(".hero-badge-text");
    if (!badge) return;
    badge.removeAttribute("data-i18n");
    const text = firestoreBatch.batchNumber
      ? `Fresh harvest window · Batch ${firestoreBatch.batchNumber}`
      : "Fresh harvest window";
    badge.textContent = text;
  }

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

  function initHeaderScroll() {
    const hdr = document.getElementById("hdr");
    if (!hdr) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        hdr.classList.add("scrolled");
      } else {
        hdr.classList.remove("scrolled");
      }
    });
  }

  function initHeroParallax() {
    const hero = document.querySelector(".hero-section");
    const bg = document.querySelector(".hero-bg-img");
    if (!hero || !bg) return;

    let ticking = false;
    let scrollY = window.scrollY;

    const update = () => {
      const yPos = scrollY * 0.8;
      const scale = 1 + scrollY * 0.0001;
      bg.style.transform = `translate3d(0, ${yPos}px, 0) scale(${scale})`;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
      if (!ticking && scrollY < 1200) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  function initHeroStoryCarousel() {
    const carousel = document.getElementById("hero-story-carousel");
    const dotsWrap = document.getElementById("hero-story-dots");
    if (!carousel || !dotsWrap) return;
    const slides = Array.from(carousel.querySelectorAll(".hero-story-slide"));
    const dots = Array.from(dotsWrap.querySelectorAll(".hero-story-dot"));
    if (!slides.length || slides.length !== dots.length) return;

    let active = 0;
    let timer = null;

    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => show(active + 1), 4200);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        show(i);
        start();
      });
    });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    show(0);
    start();
  }

  function initLabModal() {
    const btn = document.getElementById("lab-preview-btn");
    const modal = document.getElementById("lab-modal");
    const close = document.getElementById("lab-close");
    if (!btn || !modal || !close) return;
    const open = () => {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    };
    const shut = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      modal.style.display = "";
      document.body.style.overflow = "";
    };
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
    close.addEventListener("click", shut);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) shut();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) shut();
    });
  }

  function trust() {
    const trustEl = document.getElementById("trust");
    if (!trustEl) return;
    const trustArr = getT("index.trust", lang) || [];
    const arr = [...trustArr, ...trustArr];
    trustEl.innerHTML = arr.map((item) => `<span class=t><b>★</b> ${item}</span>`).join("");
  }

  function products() {
    const productsGrid = document.getElementById("productsGrid");
    if (!productsGrid) return;
    productsGrid.innerHTML = data.map((d, i) => `
      <article class="product-card">
        <div class="product-card-img-wrap">
          <img src="${d.img}" alt="${d.n}" class="product-card-img" width="300" height="300" loading="lazy">
        </div>
        <div class="product-card__body">
          <div class="product-card__top">
            <span class="product-card__fit">${getT(d.fitKey, lang)}</span>
            <h3 class="product-card__name">${d.n}</h3>
          </div>
          <div class="product-card__decision">
            <strong>${getT("index.prodDecision", lang)}</strong>
            <span>${getT(d.decisionKey, lang)}</span>
          </div>
          <div class="product-card__specs">
            <div class="product-card__spec">
              <div class="spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2h10l1 2H6l1-2Z"/><path d="M3 7h18l-1.5 12h-15L3 7Z"/><path d="M12 7v12"/></svg>
              </div>
              <div class="spec-data">
                <span class="spec-label">${getT("index.specW", lang)}</span>
                <span class="spec-value">${d.w}</span>
              </div>
            </div>
            <div class="product-card__spec">
              <div class="spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v10"/><path d="m16 8-4-4-4 4"/><path d="M3 22h18"/><path d="M5 22v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/></svg>
              </div>
              <div class="spec-data">
                <span class="spec-label">${getT("index.specDM", lang)}</span>
                <span class="spec-value">${d.dm}</span>
              </div>
            </div>
            <div class="product-card__spec">
              <div class="spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
              </div>
              <div class="spec-data">
                <span class="spec-label">${getT("index.specWR", lang)}</span>
                <span class="spec-value">${d.wr}</span>
              </div>
            </div>
            <div class="product-card__spec">
              <div class="spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>
              </div>
              <div class="spec-data">
                <span class="spec-label">${getT("index.specST", lang)}</span>
                <span class="spec-value">${d.s}</span>
              </div>
            </div>
          </div>
          <div class="product-card__price">
            <div class="price-box">
              <strong>₹${d.p.toLocaleString("en-IN")}</strong>
              <small>/bale</small>
            </div>
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
            <button class="btn-premium add" data-i="${i}" data-name="${d.n}" ${d.s ? "" : "disabled"}>
              🛒 ${getT("index.prodAdd", lang)}
            </button>
            <a class="wa-link-premium" href="https://wa.me/919727007431?text=${encodeURIComponent(`Hi, I want to order ${d.n} maize silage bales.`)}" target="_blank" rel="noopener noreferrer">${getT("common.whatsappOrder", lang)}</a>
          </div>
        </div>
      </article>`).join("");

    document.querySelectorAll(".product-card").forEach((card) => {
      const minus = card.querySelector(".qty-minus");
      const plus = card.querySelector(".qty-plus");
      const input = card.querySelector(".qty-input");
      const addBtn = card.querySelector(".add");
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
        const index = Number(addBtn.dataset.i);
        if (!data[index].s) return;
        
        const qty = parseInt(input.value, 10) || 0;
        if (!checkQty(qty)) return;

        addToCart({ name: data[index].n, weight: data[index].w, price: data[index].p, qty });
        data[index].s -= qty;
        updateCartBadge();
        showCartToast(data[index].n);
        
        const original = addBtn.innerHTML;
        addBtn.textContent = "✓ Added!";
        setTimeout(() => { 
          products(); 
        }, 1500);
      };
    });
  }

  function pricing() {
    const table = document.getElementById("pricingTable");
    if (!table) return;
    const priceH = getT("index.priceH", lang);
    const priceRows = getT("index.priceRows", lang);

    // Desktop table (hidden on mobile via CSS)
    table.innerHTML = `
      <thead>
        <tr>
          <th>${priceH[0]}</th>
          <th>${priceH[1]}</th>
          <th class="best-value">${priceH[2]}</th>
          <th>${priceH[3]}</th>
        </tr>
      </thead>
      <tbody>
        ${priceRows.map((row) => `
          <tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td class="hi best-value">${row[2]}</td>
            <td class="${row[3] === "—" ? "excluded" : "included"}">${row[3] === "—" ? "—" : "✓ " + row[3]}</td>
          </tr>`).join("")}
        <tr class="cta-row">
          <td colspan="2">${getT("index.priceCta1", lang)}</td>
          <td class="best-value"><a href="product.html" class="btn-accent">${getT("index.priceCta2", lang)}</a></td>
          <td><a href="checkout.html" class="btn-accent">${getT("index.priceCta3", lang)}</a></td>
        </tr>
      </tbody>`;

    // Mobile card layout (shown on mobile via CSS, hidden on desktop)
    const wrap = table.closest(".ptable-wrap");
    if (!wrap) return;

    // Remove any existing mobile cards to avoid duplicates on re-render
    const existing = wrap.querySelector(".ptable-mobile-cards");
    if (existing) existing.remove();

    const cards = document.createElement("div");
    cards.className = "ptable-mobile-cards";

    cards.innerHTML = priceRows.map((row) => {
      const hasSaving = row[3] !== "—";
      return `
        <div class="ptable-mobile-card">
          <div class="pm-cell">
            <span class="pm-label">${priceH[0]}</span>
            <span class="pm-value">${row[0]}</span>
          </div>
          <div class="pm-cell">
            <span class="pm-label">${priceH[1]}</span>
            <span class="pm-value">${row[1]}</span>
          </div>
          <div class="pm-cell">
            <span class="pm-label">${priceH[2]}</span>
            <span class="pm-value is-price">${row[2]}</span>
          </div>
          <div class="pm-cell">
            <span class="pm-label">${priceH[3]}</span>
            <span class="pm-value ${hasSaving ? "is-saving" : ""}">${hasSaving ? "✓ " + row[3] : "—"}</span>
          </div>
        </div>`;
    }).join("");

    // CTA strip
    cards.innerHTML += `
      <div class="ptable-mobile-cta">
        <p>${getT("index.priceCta1", lang)}</p>
        <div class="cta-btns">
          <a href="product.html" class="btn-accent">${getT("index.priceCta2", lang)}</a>
          <a href="checkout.html" class="btn-accent">${getT("index.priceCta3", lang)}</a>
        </div>
      </div>`;

    wrap.appendChild(cards);
  }

  function stats() {
    const statsEl = document.getElementById("stats");
    if (!statsEl) return;
    const statsData = [
        { l: getT("index.statFarms", lang), v: 500, s: "+" }, 
        { l: getT("index.statDelivery", lang), v: 98, s: "%" }, 
        { l: getT("index.statMilk", lang), v: 7, s: "L" }, 
        { l: getT("index.statYears", lang), v: 10, s: "+" }
    ];
    statsEl.innerHTML = statsData.map((item) => `<article class=s><div class=sv data-v=${item.v} data-s="${item.s}">0${item.s}</div><div class=sl>${item.l}</div></article>`).join("");
  }

  function countStats(el) {
    if (el.dataset.counted === "true") return;
    el.dataset.counted = "true";
    const value = parseFloat(el.dataset.v) || 0;
    const suffix = el.dataset.s || "";
    const duration = 2000;
    const start = performance.now();

    const run = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4); 
      const current = value * eased;

      if (value % 1 === 0) {
        el.textContent = Math.floor(current) + suffix;
      } else {
        el.textContent = current.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(run);
      } else {
        el.textContent = value + suffix;
      }
    };
    requestAnimationFrame(run);
  }

  function setupStatsObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countStats(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".hero-stat-num, .sv").forEach((el) => {
      observer.observe(el);
    });
  }

  function lab() {
    const labEl = document.getElementById("lab");
    if (!labEl) return;
    const items = [["Energy", "11.4 MJ/kg DM"], ["Protein", "8.9%"], ["Starch", "33.1%"], ["pH", "3.9"], ["DM", "35.0%"]];
    labEl.innerHTML = items.map((row) => `<div class=lr><span>${row[0]}</span><strong>${row[1]}</strong></div>`).join("");
  }

  function how() {
    const stepsEl = document.getElementById("steps");
    if (!stepsEl) return;
    const steps = getT("index.how", lang) || [];
    stepsEl.innerHTML = steps.map((step, index) => `<article class=step><div class=n>${index + 1}</div><h3>${step.t}</h3><p>${step.p}</p></article>`).join("");
  }

  function getInitials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : first;
    return `${first}${last}`.toUpperCase();
  }

  function tes() {
    const tesEl = document.getElementById("tes");
    if (!tesEl) return;
    const items = getT("index.tes", lang) || [];
    tesEl.innerHTML = items.map((item) => `
      <article class="tc card">
        <div class="testimonial-head">
          <div class="testimonial-avatar" aria-hidden="true">${getInitials(item.n)}</div>
          <div class="testimonial-meta">
            <strong>${item.n}</strong>
            <span>${item.s}</span>
          </div>
        </div>
        <div class="st" aria-label="5 out of 5 stars">★★★★★</div>
        <q>${item.q}</q>
      </article>`).join("");
  }

  function faq() {
    const box = document.getElementById("faq");
    if (!box) return;
    const items = getT("index.faq", lang) || [];
    box.innerHTML = items.map((item) => `<article class=fi><button class=fq type=button><span>${item.q}</span><span class=plus>+</span></button><div class=fa>${item.a}</div></article>`).join("");
    box.querySelectorAll(".fi").forEach((item) => {
      item.querySelector(".fq").onclick = () => {
        const open = item.classList.contains("open");
        box.querySelectorAll(".fi").forEach((node) => {
          node.classList.remove("open");
          node.querySelector(".plus").textContent = "+";
        });
        if (!open) {
          item.classList.add("open");
          item.querySelector(".plus").textContent = "-";
        }
      };
    });
  }

  function updateWALinks() {
    const msg = encodeURIComponent(getT("common.waMsg", lang));
    document.querySelectorAll("#wa-float-link,#hero-wa,#wa-direct-link,#mobile-wa-link").forEach((el) => {
      el.href = `https://wa.me/919727007431?text=${msg}`;
    });
  }

  function buildForm() {
    const select = document.getElementById("f-bales");
    if (!select) return;
    const options = getT("index.balesOptions", lang) || [];
    const defaultValue = select.options[0].text; // Keep "Select quantity" localized via data-i18n if possible, but here we just rebuild
    const placeholder = getT("index.formFsel", lang);
    
    let html = `<option value="">${placeholder}</option>`;
    const values = ["12-24", "25-50", "51-100", "100+"];
    options.forEach((opt, i) => {
        html += `<option value="${values[i]}">${opt}</option>`;
    });
    select.innerHTML = html;
  }

  document.getElementById("f-submit").onclick = () => {
    const name = document.getElementById("f-name").value.trim();
    const phone = document.getElementById("f-phone").value.trim();
    const village = document.getElementById("f-village").value.trim();
    const bales = document.getElementById("f-bales").value;
    const msg = document.getElementById("f-msg").value.trim();
    const status = document.getElementById("f-msg-status");
    if (!name || !phone || phone.length !== 10 || !village) {
      status.className = "form-msg error";
      status.textContent = getT("index.formErr", lang);
      return;
    }
    const waMsg = encodeURIComponent(`New Enquiry from GauVardhan Feed website:\nCompany: Gokul Biotech Pvt Ltd\nName: ${name}\nPhone: ${phone}\nVillage: ${village || "—"}\nBales Needed: ${bales || "—"}\nMessage: ${msg || "—"}`);
    window.open(`https://wa.me/919727007431?text=${waMsg}`, "_blank");
    status.className = "form-msg success";
    status.textContent = getT("index.formOk", lang);
    document.getElementById("f-name").value = "";
    document.getElementById("f-phone").value = "";
    document.getElementById("f-village").value = "";
    document.getElementById("f-bales").value = "";
    document.getElementById("f-msg").value = "";
  };

  function render() {
    applyLang(lang);
    trust();
    products();
    pricing();
    stats();
    lab();
    how();
    tes();
    faq();
    updateWALinks();
    buildForm();
    setupStatsObserver();
    updateHeroBadge();
  }

  function setLang(nextLang) {
    lang = nextLang;
    saveLang(lang);
    applyLang(lang);
    updateLangButtons(lang);
    app.classList.add("fade");
    setTimeout(() => {
      render();
      app.classList.remove("fade");
    }, 150);
  }

  // Wire up ALL [data-lang] buttons — both desktop #lang and mobile #lang-mobile
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      setLang(button.dataset.lang);
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        const stagger = entry.target.querySelectorAll(".product-card, .step, .tc, .hero-stat");
        stagger.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.12}s`;
          child.classList.add("in");
        });
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  await loadFirestoreData();
  initMobileNav();
  initHeaderScroll();
  initHeroParallax();
  initHeroStoryCarousel();
  initLabModal();
  applyLang(lang);
  updateLangButtons(lang);
  render();
});
