document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) window.location.href = "login.html";
  if (user.role !== "admin") {
    alert("Admin only!");
    window.location.href = "dashboard.html";
  }

  const bookTable = document.getElementById("bookTable");

  /* ===============================
      ✅ LOAD BOOKS
  =============================== */
  async function loadBooks() {
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let books = await res.json();   // ✅ ARRAY — already correct

      if (!books || books.length === 0) {
        bookTable.innerHTML = `
          <tr>
            <td colspan="4" style="text-align:center;">No books found</td>
          </tr>
        `;
        return;
      }

      renderBooks(books);
    } catch (err) {
      console.error("Error loading books:", err);
    }
  }

  /* ===============================
      ✅ RENDER BOOK TABLE
  =============================== */
  function renderBooks(books) {
    bookTable.innerHTML = books
      .map(
        (b) => `
        <tr>
          <td>${b.title}</td>
          <td>${(b.authors || []).join(", ")}</td>
          <td>${(b.categories || []).join(", ")}</td>
          <td>
            <button class="btn-small btn-delete" onclick="deleteBook('${b._id}')">
              Delete
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  /* ===============================
      ✅ ADD BOOK
  =============================== */
  document
    .getElementById("addBookForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const body = {
        title: title.value,
        authors: authors.value.split(",").map((x) => x.trim()),
        categories: categories.value.split(",").map((x) => x.trim()),
        description: description.value,
        pdfUrl: pdfUrl.value,
      };

      await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      e.target.reset();
      loadBooks();
    });

  /* ===============================
      ✅ DELETE BOOK
  =============================== */
  window.deleteBook = async function (id) {
    if (!confirm("Delete this book?")) return;

    await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadBooks();
  };

  /* ===============================
      ✅ LOGOUT
  =============================== */
  logoutBtn.onclick = () => {
    localStorage.clear();
    window.location.href = "login.html";
  };

  /* ✅ INIT */
  loadBooks();
});
