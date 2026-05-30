// ─────────────────────────────────────────────
//  admin.js  —  GauVardhan Feed
//
//  LEARNING: This file does 3 things:
//  1. Password gate (simple, client-side)
//  2. getDocs() — fetches all orders from Firestore
//  3. updateDoc() — changes order status
//
//  NOTE: This is a simple password gate — good enough
//  for a small private tool. For higher security
//  you'd use Firebase Authentication instead.
// ─────────────────────────────────────────────

import { db } from "./firebase.js";
import {
  collection, getDocs, doc, getDoc, setDoc, updateDoc,
  orderBy, query
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Stored SHA-256 hash (pre-computed, not plaintext) ────
const ADMIN_PASSWORD_HASH = "d9a803731f41e2ef3bb4d796972e3430be06443c856d50958cf7f2533cfb8c5b";

async function hashPassword(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

let currentFilter = "all";
let searchTerm = "";
let allOrders = [];

// ── Password Gate ─────────────────────────────
document.getElementById("gate-btn").onclick = async () => {
  const pwd = document.getElementById("gate-pwd").value;
  const inputHash = await hashPassword(pwd);
  if (inputHash === ADMIN_PASSWORD_HASH) {
    document.getElementById("gate").style.display = "none";
    document.getElementById("admin-wrap").style.display = "block";
    loadOrders();
    loadSettings();
  } else {
    document.getElementById("gate-err").textContent = "Wrong password. Try again.";
  }
};

// Allow Enter key on password field
document.getElementById("gate-pwd").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("gate-btn").click();
});

// ── Stats ────────────────────────────────────
function computeStats() {
  const pending = allOrders.filter(o => o.status === "pending").length;
  const now = new Date();
  const monthly = allOrders.filter(o => {
    if (!o.createdAt?.toDate) return false;
    const d = o.createdAt.toDate();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthRevenue = monthly.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalBales = allOrders.reduce((sum, o) => {
    return sum + (o.items || []).reduce((s, i) => s + (i.qty || 0), 0);
  }, 0);
  const totalOrders = allOrders.length;
  return { pending, monthRevenue, totalBales, totalOrders };
}

function renderStats() {
  const s = computeStats();
  const el = (id) => document.getElementById(id);
  el("stat-pending").textContent = s.pending;
  el("stat-revenue").textContent = "₹" + s.monthRevenue.toLocaleString("en-IN");
  el("stat-bales").textContent = s.totalBales;
  el("stat-orders").textContent = s.totalOrders;
}

// ── Settings: Load ───────────────────────────
async function loadSettings() {
  try {
    const stockSnap = await getDoc(doc(db, "settings", "stock"));
    if (stockSnap.exists()) {
      const st = stockSnap.data();
      document.getElementById("stock-pro100").value = st.pro100 ?? "";
      document.getElementById("stock-max700").value = st.max700 ?? "";
    }
    const priceSnap = await getDoc(doc(db, "settings", "prices"));
    if (priceSnap.exists()) {
      const pr = priceSnap.data();
      document.getElementById("price-pro100-t1").value = pr.pro100?.tier1 ?? "";
      document.getElementById("price-pro100-t2").value = pr.pro100?.tier2 ?? "";
      document.getElementById("price-pro100-t3").value = pr.pro100?.tier3 ?? "";
      document.getElementById("price-max700-t1").value = pr.max700?.tier1 ?? "";
      document.getElementById("price-max700-t2").value = pr.max700?.tier2 ?? "";
      document.getElementById("price-max700-t3").value = pr.max700?.tier3 ?? "";
    }
    const batchSnap = await getDoc(doc(db, "settings", "batch"));
    if (batchSnap.exists()) {
      const b = batchSnap.data();
      document.getElementById("batch-number").value = b.batchNumber ?? "";
      document.getElementById("batch-harvest").value = b.harvestDate ?? "";
      document.getElementById("batch-fresh").checked = b.freshBatch ?? false;
    }
  } catch (e) {
    console.warn("Failed to load settings:", e);
  }
}

// ── Settings: Save ───────────────────────────
document.getElementById("save-stock").onclick = async () => {
  const data = {
    pro100: parseInt(document.getElementById("stock-pro100").value) || 0,
    max700: parseInt(document.getElementById("stock-max700").value) || 0
  };
  try {
    await setDoc(doc(db, "settings", "stock"), data);
    alert("Stock saved.");
  } catch (e) {
    alert("Failed to save stock: " + e.message);
  }
};

document.getElementById("save-prices").onclick = async () => {
  const data = {
    pro100: {
      tier1: parseInt(document.getElementById("price-pro100-t1").value) || 0,
      tier2: parseInt(document.getElementById("price-pro100-t2").value) || 0,
      tier3: parseInt(document.getElementById("price-pro100-t3").value) || 0
    },
    max700: {
      tier1: parseInt(document.getElementById("price-max700-t1").value) || 0,
      tier2: parseInt(document.getElementById("price-max700-t2").value) || 0,
      tier3: parseInt(document.getElementById("price-max700-t3").value) || 0
    }
  };
  try {
    await setDoc(doc(db, "settings", "prices"), data);
    alert("Prices saved.");
  } catch (e) {
    alert("Failed to save prices: " + e.message);
  }
};

document.getElementById("save-batch").onclick = async () => {
  const data = {
    batchNumber: document.getElementById("batch-number").value,
    harvestDate: document.getElementById("batch-harvest").value,
    freshBatch: document.getElementById("batch-fresh").checked
  };
  try {
    await setDoc(doc(db, "settings", "batch"), data);
    alert("Batch saved.");
  } catch (e) {
    alert("Failed to save batch: " + e.message);
  }
};

// ── Settings Toggle ──────────────────────────
document.getElementById("settings-toggle").onclick = () => {
  const body = document.getElementById("settings-body");
  const toggle = document.getElementById("settings-toggle");
  const isOpen = body.style.display !== "none";
  body.style.display = isOpen ? "none" : "block";
  toggle.textContent = isOpen ? "⚙ Site Settings ▸" : "⚙ Site Settings ▾";
};

// ── Load Orders from Firestore ─────────────────
async function loadOrders() {
  document.getElementById("orders-body").innerHTML =
    '<tr><td colspan="9" class="loading-row">Loading orders...</td></tr>';
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    allOrders = [];
    snapshot.forEach(docSnap => {
      allOrders.push({ id: docSnap.id, ...docSnap.data() });
    });

    renderTable();
  } catch (err) {
    console.error("Failed to load orders:", err);
    document.getElementById("orders-body").innerHTML =
      '<tr><td colspan="9" class="loading-row error">Failed to load. Check Firestore rules.</td></tr>';
  }
}

// ── Render Table ──────────────────────────────
function renderTable() {
  let filtered = currentFilter === "all"
    ? allOrders
    : allOrders.filter(o => o.status === currentFilter);

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(o =>
      (o.name || "").toLowerCase().includes(term) ||
      (o.phone || "").includes(term)
    );
  }

  document.getElementById("order-count").textContent =
    `${filtered.length} order${filtered.length !== 1 ? "s" : ""} ${currentFilter !== "all" ? `(${currentFilter})` : ""}`;

  if (filtered.length === 0) {
    const msg = searchTerm ? "No orders matching your search." : "No orders found.";
    document.getElementById("orders-body").innerHTML =
      `<tr><td colspan="9" class="loading-row">${msg}</td></tr>`;
    renderStats();
    return;
  }

  document.getElementById("orders-body").innerHTML = filtered.map(order => {
    const date = order.createdAt?.toDate
      ? order.createdAt.toDate().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })
      : "—";

    const items = (order.items || [])
      .map(i => `${i.name} ×${i.qty}`)
      .join(", ");

    const statusClass = {
      pending: "status-pending",
      confirmed: "status-confirmed",
      delivered: "status-delivered"
    }[order.status] || "";

    return `
      <tr>
        <td class="order-id" title="${order.id}">${order.id.slice(0, 8)}...</td>
        <td>${date}</td>
        <td><strong>${order.name || "—"}</strong></td>
        <td><a href="tel:${order.phone}" class="phone-link">${order.phone || "—"}</a></td>
        <td>${order.address || "—"}<br><small>${order.district || ""} ${order.pincode || ""}</small></td>
        <td class="items-cell">${items}</td>
        <td class="total-cell">₹${(order.total || 0).toLocaleString("en-IN")}</td>
        <td><span class="status-badge ${statusClass}">${order.status || "pending"}</span></td>
        <td class="actions-cell">
          ${order.status === "pending" ? `<button class="action-btn confirm-btn" data-id="${order.id}">✓ Confirm</button>` : ""}
          ${order.status === "confirmed" ? `<button class="action-btn deliver-btn" data-id="${order.id}">✓ Delivered</button>` : ""}
          <a href="https://wa.me/${order.phone?.replace(/\D/g,'')}?text=${encodeURIComponent(`Hi ${order.name}, your GauVardhan Feed order from Gokul Biotech Pvt Ltd is confirmed. We'll deliver to ${order.address} soon.`)}" target="_blank" class="action-btn wa-btn">💬 WA</a>
        </td>
      </tr>
    `;
  }).join("");

  // Attach button events
  document.querySelectorAll(".confirm-btn").forEach(btn => {
    btn.onclick = () => updateStatus(btn.dataset.id, "confirmed");
  });
  document.querySelectorAll(".deliver-btn").forEach(btn => {
    btn.onclick = () => updateStatus(btn.dataset.id, "delivered");
  });
  renderStats();
}

// ── Update Order Status ───────────────────────
async function updateStatus(id, newStatus) {
  try {
    await updateDoc(doc(db, "orders", id), { status: newStatus });
    // Update locally so we don't need to re-fetch
    const order = allOrders.find(o => o.id === id);
    if (order) order.status = newStatus;
    renderTable();
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update status. Try again.");
  }
}

// ── Filter Buttons ────────────────────────────
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.status;
    renderTable();
  };
});

// ── Search ───────────────────────────────────
document.getElementById("search-input").addEventListener("input", e => {
  searchTerm = e.target.value;
  document.getElementById("search-clear").style.display = searchTerm ? "block" : "none";
  renderTable();
});

document.getElementById("search-clear").onclick = () => {
  document.getElementById("search-input").value = "";
  searchTerm = "";
  document.getElementById("search-clear").style.display = "none";
  renderTable();
};

// ── Refresh Button ────────────────────────────
document.getElementById("refresh-btn").onclick = () => {
  loadOrders();
  loadSettings();
};
