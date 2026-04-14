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
  collection, getDocs, doc, updateDoc,
  orderBy, query
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Change this to your own admin password ────
const ADMIN_PASSWORD = "silage2026";

let currentFilter = "all";
let allOrders = [];

// ── Password Gate ─────────────────────────────
document.getElementById("gate-btn").onclick = () => {
  const pwd = document.getElementById("gate-pwd").value;
  if (pwd === ADMIN_PASSWORD) {
    document.getElementById("gate").style.display = "none";
    document.getElementById("admin-wrap").style.display = "block";
    loadOrders();
  } else {
    document.getElementById("gate-err").textContent = "Wrong password. Try again.";
  }
};

// Allow Enter key on password field
document.getElementById("gate-pwd").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("gate-btn").click();
});

// ── Load Orders from Firestore ─────────────────
// LEARNING: getDocs() fetches a snapshot of the
// entire collection. We then loop through each
// document with .forEach() and build our array.
// query() + orderBy() sorts by creation time.
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
  const filtered = currentFilter === "all"
    ? allOrders
    : allOrders.filter(o => o.status === currentFilter);

  document.getElementById("order-count").textContent =
    `${filtered.length} order${filtered.length !== 1 ? "s" : ""} ${currentFilter !== "all" ? `(${currentFilter})` : ""}`;

  if (filtered.length === 0) {
    document.getElementById("orders-body").innerHTML =
      '<tr><td colspan="9" class="loading-row">No orders found.</td></tr>';
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
}

// ── Update Order Status ───────────────────────
// LEARNING: updateDoc() updates specific fields in
// an existing document without overwriting everything.
// doc(db, "orders", id) points to the exact document.
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

// ── Refresh Button ────────────────────────────
document.getElementById("refresh-btn").onclick = loadOrders;
