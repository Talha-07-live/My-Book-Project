// Firebase config (নিজের config বসাও)
const firebaseConfig = {
  apiKey: "AIzaSyDpiN0OV1aD709Q987PymfOOp_lcW6Hid8",
  authDomain: "my-book-project-c5a17.firebaseapp.com",
  projectId: "my-book-project-c5a17",
  storageBucket: "my-book-project-c5a17.appspot.com",
  messagingSenderId: "422603504433",
  appId: "1:422603504433:web:e6870a7d2c57c045eb0e10"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// লগইন ফাংশন
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("admin-section").style.display = "block";
      loadBooks();
    })
    .catch(err => alert(err.message));
}

// বই যোগ
function addBook() {
  const title = document.getElementById("title").value;
  const rating = document.getElementById("rating").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const link = document.getElementById("link").value;

  db.collection("books").add({ title, rating, description, image, link })
    .then(() => {
      alert("✅ বই যোগ হয়েছে");
      loadBooks();
    })
    .catch(err => alert(err.message));
}

// বই লোড (এডমিন)
function loadBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  db.collection("books").get().then(snapshot => {
    snapshot.forEach(doc => {
      const book = doc.data();
      bookList.innerHTML += `
        <div class="book">
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <button onclick="deleteBook('${doc.id}')">🗑 মুছুন</button>
        </div>
      `;
    });
  });
}

// বই ডিলিট
function deleteBook(id) {
  db.collection("books").doc(id).delete()
    .then(() => loadBooks())
    .catch(err => alert(err.message));
}
