import { db } from "./firebase.js";
import { getCart, getCartTotal, clearCart, updateCartBadge } from "./cart.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getSavedLang, saveLang, applyLang, updateLangButtons, getT } from "./lang.js";

const YOUR_WA = "919727007431";
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
  
  if (!cart.length) {
    if (emptyMsg) emptyMsg.style.display = "block";
    totalsEl.style.display = "none";
    updatePlaceOrderState(true);
    return;
  }
  if (emptyMsg) emptyMsg.style.display = "none";
  totalsEl.style.display = "block";
  updatePlaceOrderState(false);
  // Remove existing items except empty msg
  const existingItems = itemsEl.querySelectorAll(".cart-item");
  existingItems.forEach(item => item.remove());
  cart.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `<div><span class="item-name">${item.name}</span><span class="item-weight">${item.weight}</span></div><div class="item-right"><span class="item-qty">x ${item.qty}</span><span class="item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</span></div>`;
    itemsEl.appendChild(itemEl);
  });
  const total = getCartTotal();
  document.getElementById("subtotal").textContent = "₹" + total.toLocaleString("en-IN");
  document.getElementById("grand-total").textContent = "₹" + total.toLocaleString("en-IN");
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
  if (!address || !pincode) return showStatus("error", getT("checkout.errAddressPin", lang));
  if (!cart.length) return showStatus("error", getT("checkout.errCart", lang));
  if (!/^\d{6}$/.test(pincode)) return showStatus("error", getT("checkout.errPin", lang));

  const btn = document.getElementById("place-order");
  btn.disabled = true;
  document.getElementById("btn-text").textContent = getT("checkout.placing", lang);

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
    window.open(`https://wa.me/${YOUR_WA}?text=${waMessage}`, "_blank");
    clearCart();
    window.location.href = `order-confirm.html?id=${orderRef.id}&name=${encodeURIComponent(name)}`;
  } catch (err) {
    console.error(err);
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

document.getElementById("lang").onclick = (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  lang = btn.dataset.lang;
  saveLang(lang);
  render();
};

window.addEventListener("scroll", () => document.getElementById("hdr").classList.toggle("scrolled", scrollY > 12), { passive: true });

render();
initMobileNav();
