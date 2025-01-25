const BOOKS_KEY = "BOOKS_DATA";

function getBooks() {
  return JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
}

function saveBooks(books) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

function renderBooks(searchQuery = "") {
  const books = getBooks();
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .forEach((book) => {
      const bookElement = createBookElement(book);

      if (book.isComplete) {
        completeBookList.appendChild(bookElement);
      } else {
        incompleteBookList.appendChild(bookElement);
      }
    });
}

function createBookElement(book) {
  const container = document.createElement("div");
  container.dataset.bookid = book.id;
  container.dataset.testid = "bookItem";

  const title = document.createElement("h3");
  title.dataset.testid = "bookItemTitle";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.dataset.testid = "bookItemAuthor";
  author.textContent = `Penulis: ${book.author}`;

  const year = document.createElement("p");
  year.dataset.testid = "bookItemYear";
  year.textContent = `Tahun: ${book.year}`;

  const buttonContainer = document.createElement("div");

  const toggleButton = document.createElement("button");
  toggleButton.dataset.testid = "bookItemIsCompleteButton";
  toggleButton.textContent = book.isComplete
    ? "Belum selesai dibaca"
    : "Selesai dibaca";
  toggleButton.addEventListener("click", () => toggleBookCompletion(book.id));

  const deleteButton = document.createElement("button");
  deleteButton.dataset.testid = "bookItemDeleteButton";
  deleteButton.textContent = "Hapus Buku";
  deleteButton.addEventListener("click", () => deleteBook(book.id));

  const editButton = document.createElement("button");
  editButton.dataset.testid = "bookItemEditButton";
  editButton.textContent = "Edit Buku";
  editButton.addEventListener("click", () => editBook(book));

  buttonContainer.appendChild(toggleButton);
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(editButton);

  container.appendChild(title);
  container.appendChild(author);
  container.appendChild(year);
  container.appendChild(buttonContainer);

  return container;
}

function addBook(event) {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = parseInt(document.getElementById("bookFormYear").value, 10);
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const books = getBooks();
  const newBook = {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };

  books.push(newBook);
  saveBooks(books);
  renderBooks();

  document.getElementById("bookForm").reset();
}

function editBook(book) {
  document.getElementById("bookFormTitle").value = book.title;
  document.getElementById("bookFormAuthor").value = book.author;
  document.getElementById("bookFormYear").value = book.year;
  document.getElementById("bookFormIsComplete").checked = book.isComplete;

  deleteBook(book.id);
}

function toggleBookCompletion(bookId) {
  const books = getBooks();
  const book = books.find((b) => b.id === bookId);

  if (book) {
    book.isComplete = !book.isComplete;
    saveBooks(books);
    renderBooks();
  }
}

function deleteBook(bookId) {
  let books = getBooks();
  books = books.filter((b) => b.id !== bookId);
  saveBooks(books);
  renderBooks();
}

function searchBooks(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchBookTitle").value;
  renderBooks(searchQuery);
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bookForm").addEventListener("submit", addBook);
  document.getElementById("searchBook").addEventListener("submit", searchBooks);
  renderBooks();
});
