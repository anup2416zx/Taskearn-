// =====================================
// TaskEarn Withdraw - Part 1
// =====================================

import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const withdrawWallet = document.getElementById("withdrawWallet");

let currentUser = null;

// Check Login
onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            withdrawWallet.innerText = "₹" + data.wallet;

        }

    } catch (error) {

        alert(error.message);

    }

});
// ----------------------
// Withdraw Request
// ----------------------

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const withdrawNowBtn = document.getElementById("withdrawNowBtn");

if (withdrawNowBtn) {

    withdrawNowBtn.addEventListener("click", async () => {

        if (!currentUser) return;

        const upiId = document.getElementById("upiId").value.trim();
        const amount = Number(document.getElementById("withdrawAmount").value);

        if (upiId === "") {
            alert("⚠️ Enter your UPI ID");
            return;
        }

        if (amount < 200) {
            alert("❌ Minimum Withdraw is ₹200");
            return;
        }

        try {

            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) return;

            const userData = userSnap.data();

            if (amount > Number(userData.wallet)) {
                alert("❌ Insufficient Wallet Balance");
                return;
            }

            await addDoc(collection(db, "withdrawRequests"), {

                uid: currentUser.uid,
                name: userData.name,
                email: userData.email,
                upiId: upiId,
                amount: amount,
                status: "Pending",
                createdAt: serverTimestamp()

            });

            alert("🎉 Withdraw Request Submitted!");

            document.getElementById("upiId").value = "";
            document.getElementById("withdrawAmount").value = "";

        } catch (error) {

            console.error(error);
            alert(error.message);

        }

    });

}
// ----------------------
// Back to Dashboard
// ----------------------

const backDashboardBtn = document.getElementById("backDashboardBtn");

if (backDashboardBtn) {

    backDashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}