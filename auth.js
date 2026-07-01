// =====================================
// TaskEarn Firebase Auth - Part 1
// =====================================

import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ----------------------
// SIGNUP
// ----------------------

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.addEventListener("click", async function () {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        if (name === "" || email === "" || password === "") {
            alert("⚠️ Please fill all fields.");
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await updateProfile(userCredential.user, {
                displayName: name
            });

            await setDoc(
                doc(db, "users", userCredential.user.uid),
                {
                    name: name,
                    email: email,
                    wallet: 0,
                    lastTask: "",
                    createdAt: new Date().toISOString()
                }
            );

            alert("🎉 Account Created Successfully!");

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

}
// ----------------------
// LOGIN
// ----------------------

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", async function () {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (email === "" || password === "") {
            alert("⚠️ Please enter Email and Password.");
            return;
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("✅ Login Successful!");

            window.location.href = "dashboard.html";

        } catch (error) {

            switch (error.code) {

                case "auth/invalid-credential":
                    alert("❌ Invalid Email or Password.");
                    break;

                case "auth/user-not-found":
                    alert("❌ User not found.");
                    break;

                case "auth/wrong-password":
                    alert("❌ Wrong Password.");
                    break;

                case "auth/invalid-email":
                    alert("❌ Invalid Email Format.");
                    break;

                default:
                    alert(error.message);

            }

        }

    });

}
// ----------------------
// LOGIN CHECK
// ----------------------

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

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

// ----------------------
// PROTECT DASHBOARD
// ----------------------

if (
    window.location.pathname.includes("dashboard.html") ||
    window.location.pathname.includes("profile.html") ||
    window.location.pathname.includes("withdraw.html")
) {

    onAuthStateChanged(auth, function (user) {

        if (!user) {

            alert("⚠️ Please Login First");

            window.location.href = "login.html";

        }

    });

}