// initializing
const container = document.querySelector(".bookContainer");
const addBookBtn = document.querySelector(".addBook");
const bookForm = document.querySelector("form");
const dialog = document.querySelector("dialog");
const mainContainer = document.querySelector(".mainContainer");
const closeDialogBtn = document.querySelector(".closeBtn");
const submitBtn = document.querySelector(".submitBtn");
const clearBtn = document.querySelector(".clearBtn");
const checkbox = document.querySelector("#check");

// book constructor
class Library {
    constructor () {
        this.library = [];
        this.init();
        }

    init() {
        //open form 
        addBookBtn.addEventListener("click", () => {
            dialog.showModal();
            mainContainer.style.filter = "blur(4px)";
        });

        // Close-dialog button
            closeDialogBtn.addEventListener("click", () => {
            dialog.close();
            mainContainer.style.filter = "none";
        });

        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            myLibrary.submitForm();
            dialog.close();
            mainContainer.style.filter = "none";
            bookForm.reset()
        });

        //clear form
        clearBtn.addEventListener("click", (e) => {
            e.preventDefault();
            bookForm.reset();
        })
    }
        
    displayBooks () {
        container.innerHTML = "";
        this.library.forEach((item, index) => {
            const bookContainer = this.createBookElement(item,index);            
            container.appendChild(bookContainer);
        })
    };
    
    createBookElement (item,index) {
        const titleInfo = document.createElement("h2");
        const pagesInfo = document.createElement("p");
        const authorInfo = document.createElement("p");
        const isRead = document.createElement("p");
        const bookButtonDiv = document.createElement("div");
        const deleteBookBtn = document.createElement("button");
        const changeReadBtn = document.createElement("button"); 
        const bookInfoContainer = document.createElement("div");

        bookInfoContainer.setAttribute("class","bookInfo")
        bookButtonDiv.setAttribute("class","bookButtonDiv");
        
        titleInfo.textContent = item.title;
        authorInfo.textContent = item.author;
        pagesInfo.textContent = `${item.pages} pages`;
        isRead.textContent = item.read;

        // delete book card
        deleteBookBtn.textContent = "Delete";
        deleteBookBtn.setAttribute("class","deleteBookBtn");
        deleteBookBtn.setAttribute("data-index",index);
     
        deleteBookBtn.addEventListener("click", (e) => {
            const i = e.target.getAttribute("data-index");
            this.library.splice(i,1);
            this.displayBooks()
        })

        // change read-status
        changeReadBtn.setAttribute("class","changeReadBtn");
        changeReadBtn.textContent = item.read === "Read: Yes" ? "Not Read" : "Read";
        changeReadBtn.addEventListener("click", () => {
            item.read = item.read === "Read: Yes" ? "Read: No": "Read: Yes";
            this.displayBooks();
        })

        // adding elements to HTML
        bookButtonDiv.appendChild(deleteBookBtn);
        bookButtonDiv.appendChild(changeReadBtn);
        bookInfoContainer.appendChild(titleInfo);
        bookInfoContainer.appendChild(authorInfo);
        bookInfoContainer.appendChild(pagesInfo);
        bookInfoContainer.appendChild(isRead);
        bookInfoContainer.appendChild(bookButtonDiv);

        return bookInfoContainer
    }

    addBookToLibrary(userBook) {
        this.library.push(userBook);
        this.displayBooks();
    }

    submitForm () {
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#pages").value;
        const isRead = checkbox.checked ? "Read: Yes": "Read: No" ;
        this.addBookToLibrary(new Book(title, author, pages, isRead));
    }
}

class Book {
    constructor (title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const myLibrary = new Library();