// ------------------------------------------------
//  checkout.js — GauVardhan Feed
//
//  LEARNING: This file does 3 things:
//  1. Reads the cart from localStorage and renders it
//  2. On "Place Order" — saves the order to Firestore
//  3. Opens WhatsApp with order details to alert you
//
//  `type="module"` in the script tag lets us use
//  `import` to bring in firebase.js and cart.js
// ------------------------------------------------

import { db } from "./firebase.js";
import { getCart, getCartTotal, clearCart } from "./cart.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getSavedLang, saveLang, applyLang, updateLangButtons } from "./lang.js";

const T = {
  en: {
    title: "Order Summary",
    empty: "Your cart is empty.",
    browseLink: "Browse products →",
    details: "Your Details",
    sub: "We'll call you within 2 hours to confirm your order and delivery slot.",
    fname: "Full Name *",
    fphone: "Phone Number *",
    faddress: "Village / Address *",
    fdistrict: "District *",
    fpincode: "Pincode *",
    fnotes: "Delivery Notes (optional)",
    btn: "Place Order (COD)",
    backLink: "← Continue Shopping"
  },
  hi: {
    title: "ऑर्डर सारांश",
    empty: "आपका कार्ट खाली है.",
    browseLink: "उत्पाद देखें →",
    details: "आपकी जानकारी",
    sub: "हम 2 घंटे में आपको कॉल करेंगे.",
    fname: "पूरा नाम *",
    fphone: "फोन नंबर *",
    faddress: "गाँव / पता *",
    fdistrict: "जिला *",
    fpincode: "पिनकोड *",
    fnotes: "डिलीवरी नोट्स (वैकल्पिक)",
    btn: "ऑर्डर करें (COD)",
    backLink: "← खरीदारी जारी रखें"
  },
  gu: {
    title: "ઓર્ડર સારાંશ",
    empty: "તમારી કાર્ટ ખાલી છે.",
    browseLink: "ઉત્પાદનો જુઓ →",
    details: "તમારી વિગત",
    sub: "અમે 2 કલાકમાં કોલ કરીશું.",
    fname: "પૂર્ણ નામ *",
    fphone: "ફોન નંબર *",
    faddress: "ગામ / સરનામું *",
    fdistrict: "જિલ્લો *",
    fpincode: "પિનકોડ *",
    fnotes: "ડિલિવરી નોંધ (વૈકલ્પિક)",
    btn: "ઓર્ડર કરો (COD)",
    backLink: "← ખરીદી ચાલુ રાખો"
  }
};

// Your WhatsApp number — orders will alert here
const YOUR_WA = "919727007431";

let lang = getSavedLang();

function fillLang() {
  const l = T[lang];
  document.querySelector(".order-summary h2").textContent = l.title;
  document.querySelector(".checkout-form h2").textContent = l.details;
  document.querySelector(".form-sub").textContent = l.sub;
  document.querySelector("#btn-text").textContent = l.btn;
  document.querySelector(".back-link").textContent = l.backLink;

  const emptyP = document.querySelector(".summary-empty p");
  if (emptyP) emptyP.innerHTML = `${l.empty} <a href="product.html">${l.browseLink}</a>`;

  const labels = document.querySelectorAll(".fg label");
  if (labels[0]) labels[0].textContent = l.fname;
  if (labels[1]) labels[1].textContent = l.fphone;
  if (labels[2]) labels[2].textContent = l.faddress;
  if (labels[3]) labels[3].textContent = l.fdistrict;
  if (labels[4]) labels[4].textContent = l.fpincode;
  if (labels[5]) labels[5].textContent = l.fnotes;
}

// Render cart items in the order summary
function renderCart() {
  const cart = getCart();
  const itemsEl = document.getElementById("cart-items");
  const emptyEl = document.getElementById("empty-msg");
  const totalsEl = document.getElementById("summary-totals");

  if (cart.length === 0) {
    itemsEl.innerHTML = "";
    emptyEl.style.display = "block";
    totalsEl.style.display = "none";
    document.getElementById("place-order").disabled = true;
    return;
  }

  emptyEl.style.display = "none";
  totalsEl.style.display = "block";

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-weight">${item.weight}</span>
      </div>
      <div class="item-right">
        <span class="item-qty">× ${item.qty}</span>
        <span class="item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</span>
      </div>
    </div>
  `).join("");

  const total = getCartTotal();
  document.getElementById("subtotal").textContent = "₹" + total.toLocaleString("en-IN");
  document.getElementById("grand-total").textContent = "₹" + total.toLocaleString("en-IN");
}

// Place Order

document.getElementById("place-order").onclick = async () => {
  const name    = document.getElementById("f-name").value.trim();
  const phone   = document.getElementById("f-phone").value.trim();
  const address = document.getElementById("f-address").value.trim();
  const district= document.getElementById("f-district").value.trim();
  const pincode = document.getElementById("f-pincode").value.trim();
  const notes   = document.getElementById("f-notes").value.trim();
  const status  = document.getElementById("form-status");
  const cart    = getCart();

  // Basic validation
  if (!name || !phone) {
    showStatus("error", "Please enter your name and phone number.");
    return;
  }
  if (!address || !pincode) {
    showStatus("error", "Please enter your delivery address and pincode.");
    return;
  }
  if (cart.length === 0) {
    showStatus("error", "Your cart is empty.");
    return;
  }
  if (!/^\d{6}$/.test(pincode)) {
    showStatus("error", "Please enter a valid 6-digit pincode.");
    return;
  }

  // Disable button and show loading
  const btn = document.getElementById("place-order");
  const btnText = document.getElementById("btn-text");
  btn.disabled = true;
  btnText.textContent = "Placing order...";

  try {
    const orderRef = await addDoc(collection(db, "orders"), {
      name,
      phone,
      address,
      district,
      pincode,
      notes,
      items: cart.map(i => ({
        name: i.name,
        weight: i.weight,
        qty: i.qty,
        price: i.price,
        subtotal: i.price * i.qty
      })),
      total: getCartTotal(),
      status: "pending",       // pending → confirmed → delivered
      paymentMethod: "COD",
      createdAt: serverTimestamp()
    });

    // Send WhatsApp alert to you
    const itemsList = cart.map(i => `• ${i.name} × ${i.qty} = ₹${(i.price * i.qty).toLocaleString("en-IN")}`).join("\n");
    const waMessage = encodeURIComponent(
      `🌾 NEW ORDER — GauVardhan Feed\n` +
      `Company: Gokul Biotech Pvt Ltd\n` +
      `Order ID: ${orderRef.id}\n\n` +
      `👤 ${name}\n` +
      `📞 ${phone}\n` +
      `📍 ${address}, ${district} — ${pincode}\n` +
      (notes ? `📝 ${notes}\n` : "") +
      `\n${itemsList}\n\n` +
      `💰 Total: ₹${getCartTotal().toLocaleString("en-IN")} (COD)`
    );
    window.open(`https://wa.me/${YOUR_WA}?text=${waMessage}`, "_blank");

    // Clear cart and redirect to confirmation page
    clearCart();
    window.location.href = `order-confirm.html?id=${orderRef.id}`;

  } catch (err) {
    console.error("Order failed:", err);
    showStatus("error", "Something went wrong. Please try again or call us directly.");
    btn.disabled = false;
    btnText.textContent = "Place Order (COD)";
  }
};

// Helper: show status message
function showStatus(type, msg) {
  const el = document.getElementById("form-status");
  el.className = "form-msg " + type;
  el.textContent = msg;
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Init
applyLang(lang);
updateLangButtons(lang);
fillLang();
renderCart();

// Language switcher
document.getElementById("lang").onclick = () => {
  const c = ["en", "hi", "gu"];
  lang = c[(c.indexOf(lang) + 1) % 3];
  saveLang(lang);
  applyLang(lang);
  updateLangButtons(lang);
  fillLang();
};

// Scroll header on scroll
window.addEventListener("scroll", () => {
  document.getElementById("hdr").classList.toggle("scrolled", scrollY > 12);
}, { passive: true });
