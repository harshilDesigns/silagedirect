import { db } from "./firebase.js";
import { getCart, getCartTotal, clearCart, updateCartBadge, updateQty } from "./cart.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getSavedLang, saveLang, applyLang, updateLangButtons, getT } from "./lang.js";


let lang = getSavedLang();

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-nav");
  if (!toggle || !menu) return;
  const close = () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.onclick = () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) close();
  });
}

function updatePlaceOrderState(isDisabled) {
  const button = document.getElementById("place-order");
  if (!button) return;
  button.disabled = isDisabled;
  button.classList.toggle("is-disabled", isDisabled);
}

function renderCart() {
  const cart = getCart();
  updateCartBadge();

  const itemsEl = document.getElementById("cart-items");
  const totalsEl = document.getElementById("summary-totals");
  const emptyMsg = document.getElementById("empty-cart-msg");
  // Remove existing items except empty msg
  const existingItems = itemsEl.querySelectorAll(".cart-item");
  existingItems.forEach(item => item.remove());

  if (!cart.length) {
    if (emptyMsg) emptyMsg.style.display = "block";
    totalsEl.style.display = "none";
    updatePlaceOrderState(true);
    return;
  }
  if (emptyMsg) emptyMsg.style.display = "none";
  totalsEl.style.display = "block";
  updatePlaceOrderState(false);
  let hasMinQtyError = false;

  cart.forEach(item => {
    const minQty = item.name === "Pro 100" ? 12 : 3;
    if (item.qty < minQty) hasMinQtyError = true;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    const showWarning = item.qty < minQty ? "block" : "none";
    itemEl.innerHTML = `<div class="item-info"><span class="item-name">${item.name}</span> <span class="item-weight">&mdash; ${item.weight}</span></div><div class="item-right"><div class="qty-controls"><button class="qty-btn minus" aria-label="Decrease quantity">-</button><span class="item-qty">${item.qty}</span><button class="qty-btn plus" aria-label="Increase quantity">+</button></div><div style="display: flex; align-items: center; gap: 12px;"><span class="item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</span><button class="btn-remove-item" aria-label="Remove item" title="Remove item">✕</button></div><div class="min-qty-msg" style="display:${showWarning}; color:#a93226; font-size:0.8rem; margin-top:4px;">Minimum order is ${minQty} bales</div></div>`;
    
    const minusBtn = itemEl.querySelector('.minus');
    if (item.qty <= minQty) {
      minusBtn.disabled = true;
      minusBtn.style.opacity = "0.3";
      minusBtn.style.cursor = "not-allowed";
    }

    minusBtn.addEventListener('click', () => {
      if (item.qty <= minQty) return;
      updateQty(item.name, item.qty - 1);
      renderCart();
    });
    
    itemEl.querySelector('.plus').addEventListener('click', () => {
      updateQty(item.name, item.qty + 1);
      renderCart();
    });
    
    itemEl.querySelector('.btn-remove-item').addEventListener('click', () => {
      updateQty(item.name, 0);
      renderCart();
    });

    itemsEl.appendChild(itemEl);
  });
  const total = getCartTotal();
  document.getElementById("subtotal").textContent = "₹" + total.toLocaleString("en-IN");
  document.getElementById("grand-total").textContent = "₹" + total.toLocaleString("en-IN");

  const btn = document.getElementById("place-order");
  let errBanner = document.getElementById("cart-min-err");
  if (!errBanner) {
    errBanner = document.createElement("div");
    errBanner.id = "cart-min-err";
    errBanner.style.color = "#a93226";
    errBanner.style.background = "rgba(232, 76, 61, 0.08)";
    errBanner.style.padding = "12px";
    errBanner.style.borderRadius = "8px";
    errBanner.style.marginTop = "16px";
    errBanner.style.fontSize = "0.9rem";
    errBanner.style.display = "none";
    totalsEl.appendChild(errBanner);
  }

  if (hasMinQtyError) {
    errBanner.textContent = "Please go back and update your quantity to meet the minimum order.";
    errBanner.style.display = "block";
    if (btn) {
      btn.disabled = true;
      btn.classList.add("is-disabled");
    }
  } else {
    errBanner.style.display = "none";
    if (btn) {
      btn.disabled = false;
      btn.classList.remove("is-disabled");
    }
  }
}

function showStatus(type, msg) {
  const el = document.getElementById("form-status");
  el.className = "form-msg " + type;
  el.textContent = msg;
}

document.getElementById("place-order").onclick = async () => {
  const name = document.getElementById("f-name").value.trim();
  const phone = document.getElementById("f-phone").value.trim();
  const address = document.getElementById("f-address").value.trim();
  const district = document.getElementById("f-district").value.trim();
  const pincode = document.getElementById("f-pincode").value.trim();
  const notes = document.getElementById("f-notes").value.trim();
  const cart = getCart();

  if (!name || !phone) return showStatus("error", getT("checkout.errNamePhone", lang));
  if (!address) return showStatus("error", getT("checkout.errAddressPin", lang));
  if (!cart.length) return showStatus("error", getT("checkout.errCart", lang));

  const btn = document.getElementById("place-order");
  btn.disabled = true;
  document.getElementById("btn-text").textContent = getT("checkout.placing", lang);

  // Open window synchronously before any async/await to prevent browser popup blockers
  const waWindow = window.open('about:blank', '_blank');

  try {
    const orderRef = await addDoc(collection(db, "orders"), {
      name, phone, address, district, pincode, notes,
      items: cart.map(i => ({ name: i.name, weight: i.weight, qty: i.qty, price: i.price, subtotal: i.price * i.qty })),
      total: getCartTotal(),
      status: "pending",
      paymentMethod: "COD",
      createdAt: serverTimestamp()
    });

    const itemsList = cart.map(i => `• ${i.name} × ${i.qty} = ₹${(i.price * i.qty).toLocaleString("en-IN")}`).join("\n");
    
    const waHeader = getT("checkout.waOrderHeader", lang);
    const waIdLabel = getT("checkout.waOrderId", lang);
    const waTotalLabel = getT("checkout.waTotal", lang);
    
    const waMessage = encodeURIComponent(`${waHeader}\n${waIdLabel}: ${orderRef.id}\n\n${name}\n${phone}\n${address}, ${district} - ${pincode}\n${notes ? notes + "\n" : ""}\n${itemsList}\n\n${waTotalLabel}: ₹${getCartTotal().toLocaleString("en-IN")} (COD)`);
    
    // Set actual WhatsApp URL on the pre-opened window
    waWindow.location.href = `https://wa.me/919727007431?text=${waMessage}`;
    
    clearCart();
    window.location.href = `order-confirm.html?id=${orderRef.id}&name=${encodeURIComponent(name)}`;
  } catch (err) {
    console.error(err);
    waWindow.close(); // Close the blank window if error
    btn.disabled = false;
    document.getElementById("btn-text").textContent = getT("checkout.placeOrder", lang);
    showStatus("error", getT("checkout.errGeneral", lang));
  }
};

function render() {
  applyLang(lang);
  updateLangButtons(lang);
  renderCart();
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => {
    lang = button.dataset.lang;
    saveLang(lang);
    render();
  });
});

window.addEventListener("scroll", () => document.getElementById("hdr").classList.toggle("scrolled", scrollY > 12), { passive: true });

render();
initMobileNav();
