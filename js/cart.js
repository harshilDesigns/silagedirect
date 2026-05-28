// ─────────────────────────────────────────────
//  cart.js  —  GauVardhan Feed
//  Manages the shopping cart across all pages
//
//  LEARNING: localStorage is like a mini-database
//  inside the browser. Data survives page refresh
//  and tab close — but only on that device.
//  We store the cart as a JSON string and parse
//  it back to an array whenever we need it.
// ─────────────────────────────────────────────

const CART_KEY = "sd_cart"; // key used in localStorage

// ── Read cart from localStorage ──────────────
export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

// ── Save cart to localStorage ─────────────────
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ── Add item or increase quantity ─────────────
// LEARNING: We find if the item already exists.
// If yes, just bump the qty. If no, push a new entry.
export function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.name === item.name);
  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  saveCart(cart);
  updateCartBadge();
}

// ── Update quantity of an existing item ───────
export function updateQty(name, qty) {
  const cart = getCart();
  const item = cart.find(c => c.name === name);
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(name);
    return;
  }
  item.qty = qty;
  saveCart(cart);
  updateCartBadge();
}

// ── Remove item from cart ─────────────────────
export function removeFromCart(name) {
  const cart = getCart().filter(c => c.name !== name);
  saveCart(cart);
  updateCartBadge();
}

// ── Clear entire cart ─────────────────────────
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// ── Get total item count (sum of all qtys) ────
export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// ── Get total price ───────────────────────────
export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ── Update the cart badge in the navbar ───────
// LEARNING: This runs on every cart change and
// finds the #cart-count element in the navbar
// (whichever page we're on) and updates the number.
export function updateCartBadge() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const count = getCartCount();
  el.textContent = count;
  el.style.display = count > 0 ? "grid" : "none";
  updateStickyCartBar();
}

// ── Cart Toast ─────────────────────────────────
let toastTimer = null;

export function showCartToast(productName) {
  if (window.location.pathname.includes("checkout") || window.location.pathname.includes("order-confirm")) return;
  let toast = document.getElementById("cartToast");
  if (!toast) {
    toast = document.createElement("a");
    toast.id = "cartToast";
    toast.className = "cart-toast";
    toast.href = "checkout.html";
    toast.innerHTML = '<span id="cartToastMsg"></span>';
    document.body.appendChild(toast);
  }
  const msg = document.getElementById("cartToastMsg");
  msg.innerHTML = `✓ ${productName} added to cart — <strong>View Cart →</strong>`;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.classList.remove("visible"); }, 3000);
}

// ── Sticky Bottom Cart Bar ────────────────────
export function updateStickyCartBar() {
  if (window.location.pathname.includes("checkout") || window.location.pathname.includes("order-confirm")) return;
  const bar = document.getElementById("cartStickyBar");
  if (!bar) return;
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  if (count === 0) { bar.classList.remove("visible"); return; }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const countEl = document.getElementById("stickyCount");
  const totalEl = document.getElementById("stickyTotal");
  if (countEl) countEl.textContent = `${count} item${count !== 1 ? "s" : ""}`;
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
  bar.classList.add("visible");
}

// ── Run badge update on page load ─────────────
document.addEventListener("DOMContentLoaded", () => { updateCartBadge(); updateStickyCartBar(); });
