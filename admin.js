// =====================================
// TaskEarn Admin Panel - Part 1
// =====================================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ⭐ Yahan apna admin email likho
const ADMIN_EMAIL = "anupg2416@gmail.com";

const totalUsers = document.getElementById("totalUsers");
const totalWithdraws = document.getElementById("totalWithdraws");

// ----------------------
// Admin Login Check
// ----------------------

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    if (user.email !== ADMIN_EMAIL) {

        alert("❌ Access Denied!");

        window.location.href = "dashboard.html";
        return;

    }

    // Total Users
    const usersSnapshot =
        await getDocs(collection(db, "users"));

    totalUsers.innerText =
        usersSnapshot.size;

    // Total Withdraw Requests
    const withdrawSnapshot =
        await getDocs(collection(db, "withdrawRequests"));

    totalWithdraws.innerText =
        withdrawSnapshot.size;

});