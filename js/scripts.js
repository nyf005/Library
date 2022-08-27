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

class Library {
  books = [];
  addBook(book) {
    this.books.push(book);
  }

  get books() {
    return books;
  }
}

let myLibrary = new Library();
myLibrary.addBook(new Book("The Alchemist", "Paulo Coelho", 197, false));
myLibrary.addBook(new Book("Animal Farm", "George Orwell", 112, false));
myLibrary.addBook(new Book("The Art of War", "Sun Tzu", 273, true));
myLibrary.addBook(new Book("The Book Thief", "Markus Zusak", 584, false));
myLibrary.addBook(
  new Book(
    "The Curious Incident of the Dog in the Night-Time",
    "Mark Haddon",
    274,
    false
  )
);

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

// Display books from library
displayBooks();

function displayBooks() {
  tableBody.innerHTML = "";
  let books = myLibrary.books;

  for (let i = 0; i < books.length; i++) {
    let row = `<tr>
         <td>${books[i].title}</td>
           <td>${books[i].author}</td>
           <td>${books[i].pages}</td>
           <td><input class="status" type="checkbox" data-index=${i} ${
      books[i].isRead ? "checked" : ""
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

const validateTitleOnChange = (titleInput) => {
  titleInput.setCustomValidity("");
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("The title of the book is required.");
  }
  titleInput.reportValidity();

  return title.reportValidity();
};

const validateAuthorOnInput = (authorInput) => {
  const feedback = authorInput.parentElement.querySelector(".feedback p");
  authorInput.setCustomValidity("");

  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("The author name is required.");
  } else if (authorInput.validity.patternMismatch) {
    feedback.textContent =
      "The author name should contain more than one alphabetical characters and/or special characters . and -";

    // setCutomValidity sets the message
    authorInput.setCustomValidity(feedback.textContent);
  }
  // Report validity is used to display the message to the popup message and mark the field as invalid
  authorInput.reportValidity();

  return authorInput.reportValidity();
};

const validatePagesOnInput = (pagesInput) => {
  const feedback = pagesInput.parentElement.querySelector(".feedback p");
  pagesInput.setCustomValidity("");
  console.log(pages.validity);
  if (pagesInput.validity.badInput) {
    feedback.textContent = "Pages input should only contain numeric characters";

    pagesInput.setCustomValidity(feedback.textContent);
  }

  pagesInput.reportValidity();

  return pagesInput.reportValidity();
};

title.addEventListener("change", () => validateTitleOnChange(title));
title.addEventListener("input", () => validateTitleOnChange(title));

author.addEventListener("input", () => validateAuthorOnInput(author));
pages.addEventListener("input", () => validatePagesOnInput(pages));

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form to be submitted

  if (
    validateTitleOnChange(title) &&
    validateAuthorOnInput(author) &&
    validatePagesOnInput(pages)
  ) {
    let book = new Book(title.value, author.value, pages.value, isRead.checked);

    myLibrary.addBook(book);
    resetForm();
    displayBooks();
  }
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
