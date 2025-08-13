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

// বই লোড
db.collection("books").onSnapshot(snapshot => {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  snapshot.forEach(doc => {
    const book = doc.data();
    bookList.innerHTML += `
      <div class="book">
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>⭐ ${book.rating}</p>
        <p>${book.description}</p>
        <a href="${book.link}" target="_blank">📥 ডাউনলোড</a>
      </div>
    `;
  });
});
