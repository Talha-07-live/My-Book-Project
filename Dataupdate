<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Firebase Data Admin Panel</title>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-6">
  <h1 class="text-2xl font-bold mb-4">🔥 Firebase Admin Panel</h1>

  <!-- Login Form -->
  <div id="loginBox" class="bg-white p-4 rounded shadow w-96">
    <h2 class="text-lg mb-2">Admin Login</h2>
    <input id="email" type="email" placeholder="Email" class="border p-2 rounded w-full mb-2">
    <input id="password" type="password" placeholder="Password" class="border p-2 rounded w-full mb-2">
    <button onclick="login()" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
    <p id="loginError" class="text-red-500 mt-2"></p>
  </div>

  <!-- Admin Panel -->
  <div id="adminPanel" class="hidden">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Database Manager</h2>
      <button onclick="logout()" class="bg-gray-700 text-white px-3 py-1 rounded">Logout</button>
    </div>

    <!-- Search -->
    <div class="mb-4 flex space-x-2">
      <input id="searchKey" type="text" placeholder="Enter key path (e.g. movies/Jawan_2023)" class="border p-2 rounded w-1/2">
      <button onclick="searchData()" class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
    </div>

    <!-- Results -->
    <div id="results" class="bg-white p-4 rounded shadow"></div>
  </div>

  <script>
    // ✅ Firebase Config
    const firebaseConfig = {
      apiKey: "AIzaSyDpiN0OV1aD709Q987PymfOOp_lcW6Hid8",
      authDomain: "my-book-project-c5a17.firebaseapp.com",
      databaseURL: "https://my-book-project-c5a17-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "my-book-project-c5a17",
      storageBucket: "my-book-project-c5a17.appspot.com",
      messagingSenderId: "422603504433",
      appId: "1:422603504433:web:e6870a7d2c57c045eb0e10",
      measurementId: "G-F763MR7FR9"
    };

    const ADMIN_UID = "PDK5rMhfUAc2mFA7VwKh3EtItov1";

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    const auth = firebase.auth();

    // 🔐 Auth State Check
    auth.onAuthStateChanged(user => {
      if (user && user.uid === ADMIN_UID) {
        document.getElementById("loginBox").classList.add("hidden");
        document.getElementById("adminPanel").classList.remove("hidden");
      } else {
        document.getElementById("loginBox").classList.remove("hidden");
        document.getElementById("adminPanel").classList.add("hidden");
      }
    });

    // 🔑 Login
    async function login() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (e) {
        document.getElementById("loginError").innerText = "❌ " + e.message;
      }
    }

    // 🚪 Logout
    function logout() {
      auth.signOut();
    }

    // 🔍 Search Data
    async function searchData() {
      const key = document.getElementById("searchKey").value.trim();
      if (!key) return alert("Please enter a key path!");

      const snapshot = await db.ref(key).get();
      const resultsDiv = document.getElementById("results");

      if (!snapshot.exists()) {
        resultsDiv.innerHTML = "<p class='text-red-500'>No data found!</p>";
        return;
      }

      const data = snapshot.val();
      resultsDiv.innerHTML = `
        <pre class="bg-gray-200 p-2 rounded overflow-x-auto">${JSON.stringify(data, null, 2)}</pre>
        <textarea id="editBox" class="w-full border p-2 rounded mt-2" rows="6">${JSON.stringify(data, null, 2)}</textarea>
        <button onclick="updateData('${key}')" class="bg-green-500 text-white px-4 py-2 rounded mt-2">Update</button>
        <button onclick="deleteData('${key}')" class="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">Delete</button>
      `;
    }

    // ✏️ Update Data
    async function updateData(path) {
      try {
        const newData = JSON.parse(document.getElementById("editBox").value);
        await db.ref(path).set(newData);
        alert("✅ Data updated successfully!");
        searchData();
      } catch (e) {
        alert("❌ Invalid JSON format!");
      }
    }

    // 🗑️ Delete Data
    async function deleteData(path) {
      if (confirm("Are you sure you want to delete this data?")) {
        await db.ref(path).remove();
        alert("🗑️ Data deleted!");
        document.getElementById("results").innerHTML = "";
      }
    }
  </script>
</body>
</html>
