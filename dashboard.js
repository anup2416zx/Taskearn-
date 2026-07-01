// =====================================
// TaskEarn Dashboard - Part 1
// =====================================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ----------------------
// Dashboard Elements
// ----------------------

const welcome = document.getElementById("welcome");
const userEmail = document.getElementById("userEmail");
const wallet = document.getElementById("wallet");

// ----------------------
// Load User Data
// ----------------------

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            if (welcome) {
                welcome.innerText =
                    "👋 Welcome, " + data.name;
            }

            if (userEmail) {
                userEmail.innerText =
                    data.email;
            }

            if (wallet) {
                wallet.innerText =
                    "₹" + data.wallet;
            }

        }

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

});
// ----------------------
// Daily Task
// ----------------------

import {
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const taskBtn = document.getElementById("taskBtn");

if (taskBtn) {

    taskBtn.addEventListener("click", async () => {

        const user = auth.currentUser;

        if (!user) return;

        try {

            const userRef = doc(db, "users", user.uid);

            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) return;

            const data = userSnap.data();

            const today = new Date().toDateString();

            if (data.lastTask === today) {

                alert("⚠️ Today's task is already completed.");

                return;

            }

            const newWallet = Number(data.wallet) + 5;

            await updateDoc(userRef, {

                wallet: newWallet,
                lastTask: today

            });

            wallet.innerText = "₹" + newWallet;

            alert("🎉 Daily Task Completed! ₹5 Added.");

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}
// ----------------------
// Navigation & Logout
// ----------------------

import {
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const profileBtn = document.getElementById("profileBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Profile
if (profileBtn) {

    profileBtn.addEventListener("click", function () {

        window.location.href = "profile.html";

    });

}

// Withdraw
if (withdrawBtn) {

    withdrawBtn.addEventListener("click", function () {

        window.location.href = "withdraw.html";

    });

}

// Logout
if (logoutBtn) {

    logoutBtn.addEventListener("click", async function () {

        try {

            await signOut(auth);

            alert("👋 Logged Out Successfully!");

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

}