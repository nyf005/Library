class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleBookStatus() {
    this.isRead = !this.isRead;
  }
}

let myLibrary = [
  new Book("The Alchemist", "Paulo Coelho", 197, false),
  new Book("Animal Farm", "George Orwell", 112, false),
  new Book("The Art of War", "Sun Tzu", 273, true),
  new Book("The Book Thief", "Markus Zusak", 584, false),
  new Book(
    "The Curious Incident of the Dog in the Night-Time",
    "Mark Haddon",
    274,
    false
  ),
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
const toggleBtns = document.getElementsByClassName("status");

function addBookToLibray(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  tableBody.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let row = `<tr>
         <td>${myLibrary[i].title}</td>
           <td>${myLibrary[i].author}</td>
           <td>${myLibrary[i].pages}</td>
           <td><input class="status" type="checkbox" data-index=${i} ${
      myLibrary[i].isRead ? "checked" : ""
    } /></td>
           <td><button class="deleteBtn" data-index=${i}>X</button></td>
       </tr>`;
    tableBody.innerHTML += row;
  }

  const deleteBtns = document.getElementsByClassName("deleteBtn");
  Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      myLibrary.splice(e.target.getAttribute("data-index"), 1);
      displayBooks();
    });
  });
}

function resetForm() {
  disableBackground.style.display = "none";
  form.style.display = "none";
  form.reset();
}

// Display books from libraryArray
displayBooks();

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form to be submitted
  addBookToLibray(title.value, author.value, pages.value, isRead.checked);
  resetForm();
});

Array.from(toggleBtns).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let i = e.target.getAttribute("data-index");
    myLibrary[i].toggleBookStatus();
  });
});

openFormBtn.addEventListener("click", () => {
  disableBackground.style.display = "block";
  form.style.display = "block";
});

disableBackground.addEventListener("click", () => {
  resetForm();
});
