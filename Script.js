// =====================================
// TaskEarn v2 - Script.js (Part 1)
// =====================================

console.log("🚀 TaskEarn Started");

// ----------------------
// HOME PAGE
// ----------------------

const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

// ----------------------
// SIGNUP PAGE
// ----------------------

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.addEventListener("click", function () {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        if (name === "" || email === "" || password === "") {
            alert("⚠️ Please fill all fields.");
            return;
        }

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        if (!localStorage.getItem("wallet")) {
            localStorage.setItem("wallet", "0");
        }

        alert("🎉 Account Created Successfully!");

        window.location.href = "login.html";

    });

}

// ----------------------
// LOGIN PAGE
// ----------------------

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (email === savedEmail && password === savedPassword) {

            alert("✅ Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            alert("❌ Invalid Email or Password!");

        }

    });

}

// ----------------------
// DASHBOARD
// ----------------------

const welcome = document.getElementById("welcome");
const userEmail = document.getElementById("userEmail");
const wallet = document.getElementById("wallet");

let balance = Number(localStorage.getItem("wallet")) || 0;

if (welcome) {
    welcome.innerText =
        "👋 Welcome, " + (localStorage.getItem("name") || "Guest");
}

if (userEmail) {
    userEmail.innerText =
        localStorage.getItem("email") || "";
}

if (wallet) {
    wallet.innerText = "₹" + balance;
}
// ----------------------
// DAILY TASK
// ----------------------

const taskBtn = document.getElementById("taskBtn");

if (taskBtn) {

    taskBtn.addEventListener("click", function () {

        const today = new Date().toDateString();
        const lastTask = localStorage.getItem("lastTask");

        if (lastTask === today) {
            alert("⚠️ Today's task is already completed.");
            return;
        }

        balance += 5;

        localStorage.setItem("wallet", balance);
        localStorage.setItem("lastTask", today);

        if (wallet) {
            wallet.innerText = "₹" + balance;
        }

        alert("🎉 Congratulations! ₹5 Added.");

    });

}

// ----------------------
// PROFILE PAGE
// ----------------------

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileWallet = document.getElementById("profileWallet");

if (profileName) {
    profileName.innerText =
        localStorage.getItem("name") || "Guest";
}

if (profileEmail) {
    profileEmail.innerText =
        localStorage.getItem("email") || "";
}

if (profileWallet) {
    profileWallet.innerText =
        "₹" + (localStorage.getItem("wallet") || "0");
}

// ----------------------
// NAVIGATION
// ----------------------

const profileBtn = document.getElementById("profileBtn");

if (profileBtn) {

    profileBtn.addEventListener("click", function () {

        window.location.href = "profile.html";

    });

}

const backDashboardBtn =
document.getElementById("backDashboardBtn");

if (backDashboardBtn) {

    backDashboardBtn.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}

const withdrawBtn =
document.getElementById("withdrawBtn");

if (withdrawBtn) {

    withdrawBtn.addEventListener("click", function () {

        window.location.href = "withdraw.html";

    });

}

// ----------------------
// WITHDRAW PAGE
// ----------------------

const withdrawWallet =
document.getElementById("withdrawWallet");

const withdrawNowBtn =
document.getElementById("withdrawNowBtn");

if (withdrawWallet) {

    withdrawWallet.innerText =
        "₹" + (localStorage.getItem("wallet") || "0");

}

if (withdrawNowBtn) {

    withdrawNowBtn.addEventListener("click", function () {

        const amount =
        Number(document.getElementById("withdrawAmount").value);

        const upi =
        document.getElementById("upiId").value.trim();

        let walletMoney =
        Number(localStorage.getItem("wallet")) || 0;

        if (upi === "") {
            alert("⚠️ Enter UPI ID");
            return;
        }

        if (amount < 200) {
            alert("❌ Minimum Withdraw ₹200");
            return;
        }

        if (amount > walletMoney) {
            alert("❌ Insufficient Wallet Balance");
            return;
        }

        walletMoney -= amount;

        localStorage.setItem("wallet", walletMoney);

        alert("🎉 Withdraw Request Submitted!");

        location.reload();

    });

}

// ----------------------
// LOGOUT
// ----------------------

const logoutBtn =
document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        window.location.href = "login.html";

    });

}