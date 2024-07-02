// initializing
const container = document.querySelector(".bookContainer");
const addBookBtn = document.querySelector(".addBook");
const bookForm = document.querySelector("form");
const dialog = document.querySelector("dialog");
const mainContainer = document.querySelector(".mainContainer");
const closeDialogBtn = document.querySelector(".closeBtn");
const submitBtn = document.querySelector(".submitBtn");
const clearBtn = document.querySelector(".clearBtn");
const checkbox = document.querySelector("#check")

// book constructor
function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// push books into a list
let myLibrary = [];

const addBookToLibrary = (userBook) => {
    myLibrary.push(userBook);
}

// display book cards
const displayBooks = ((bookInput) => {
    container.innerHTML = "";
    myLibrary.forEach((item, index) => {
        const bookInfoContainer = document.createElement("div");
        bookInfoContainer.setAttribute("class","bookInfo")
        const titleInfo = document.createElement("h2");
        const pagesInfo = document.createElement("p");
        const authorInfo = document.createElement("p");
        const isRead = document.createElement("p");
        const bookButtonDiv = document.createElement("div");
        bookButtonDiv.setAttribute("class","bookButtonDiv")

        titleInfo.textContent = item.title;
        authorInfo.textContent = item.author;
        pagesInfo.textContent = `${item.pages} pages`;
        isRead.textContent = item.read;

        // delete book card
        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.textContent = "Delete"
        deleteBookBtn.setAttribute("class","deleteBookBtn");
        deleteBookBtn.setAttribute("data-index",index)
     
        deleteBookBtn.addEventListener("click", (e) => {
            const i = e.target.getAttribute("data-index");
            myLibrary.splice(i,1);
            displayBooks()
        })

        // change read-status
        const changeReadBtn = document.createElement("button"); 
        changeReadBtn.setAttribute("class","changeReadBtn");
        changeReadBtn.textContent = item.read === "Read: Yes" ? "Not Read" : "Read";
        changeReadBtn.addEventListener("click", () => {
            item.read = item.read === "Read: Yes" ? "Read: No": "Read: Yes";
            displayBooks();
        })


        // adding elements to HTML
        bookButtonDiv.appendChild(deleteBookBtn);
        bookButtonDiv.appendChild(changeReadBtn);
        bookInfoContainer.appendChild(titleInfo);
        bookInfoContainer.appendChild(authorInfo);
        bookInfoContainer.appendChild(pagesInfo);
        bookInfoContainer.appendChild(isRead);
        bookInfoContainer.appendChild(bookButtonDiv);
        container.appendChild(bookInfoContainer);
    })
});

// add book button
addBookBtn.addEventListener("click", () => {
    dialog.showModal();
    mainContainer.style.filter = "blur(4px)";
});

// Close dialog button
    closeDialogBtn.addEventListener("click", () => {
    dialog.close();
    mainContainer.style.filter = "none";
});

// submit form
const submitForm = () => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    if (checkbox.checked) {
        const isRead = "Read: Yes" ;
        addBookToLibrary(new Book(title, author, pages, isRead));
        displayBooks();
    }
    else {
        addBookToLibrary(new Book(title, author, pages, "Read: No"));
        displayBooks();
    }
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submitForm();
    dialog.close();
    mainContainer.style.filter = "none";
    bookForm.reset()
});

//clear form
clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    bookForm.reset();
})

//book examples
addBookToLibrary(new Book("LOTR", "J.R.R. Tolkien", "1178", "Read: Yes"));
addBookToLibrary(new Book("Harry Potter", "J.K. Rowling", "223", "Read: No"));
addBookToLibrary(new Book("1984", "George Orwell", "328", "Read: Yes"));

displayBooks();