let myLibrary = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    pages: 197,
    isRead: false,
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    pages: 112,
    isRead: false,
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    pages: 273,
    isRead: true,
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    pages: 584,
    isRead: false,
  },
  {
    title: "The Curious Incident of the Dog in the Night-Time",
    author: "Mark Haddon",
    pages: 274,
    isRead: false,
  },
];

const table = document.getElementById("booksTable");
const tableBody = document.querySelector("tbody");
const openFormBtn = document.getElementById("openFormBtn");
const disableBackground = document.getElementById("disableBackground");
const form = document.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("status");

displayBooks();

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibray(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  tableBody.innerHTML = "";
  myLibrary.forEach((book) => {
    let row = `
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.isRead ? "already read" : "not read yet"}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function resetForm() {
  disableBackground.style.display = "none";
  form.style.display = "none";
  form.reset();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibray(title.value, author.value, pages.value, isRead.checked);
  resetForm();
});

openFormBtn.addEventListener("click", () => {
  disableBackground.style.display = "block";
  form.style.display = "block";
});

disableBackground.addEventListener("click", () => {
  resetForm();
});
