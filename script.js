let library = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use the 'new' keyword to call the constructor.");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

function addBookToLibrary(title, author, pages, read){
    const book =  new Book(title, author, pages, read);
    library.push(book);
    renderUi();
}


const title = document.querySelector("#title-id");
const author = document.querySelector("#author-id");
const pages = document.querySelector("#pages-id");
const read = document.querySelector("#read-id");

const submitBtn = document.querySelector("#submitbtn");

const addBtn = document.querySelector("#addbtn");

const formModal = document.querySelector(".form-modal");

addBtn.addEventListener("click", () => {
    formModal.classList.toggle("show");
});


function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.classList.add("toast");

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

submitBtn.addEventListener("click", (event)=> {
    event.preventDefault();
    const pagesNum = Number(pages.value);

    if(title.value == "" || author.value == "" || pages.value == "" || !Number.isInteger(pagesNum)){
        showToast("Invlaid Data Input or Data Empty!");
        return;
    }
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    title.value = "";
    author.value = "";
    pages.value = ""
    read.checked = false;
    formModal.classList.toggle("show");
    showToast("Book Added Successfully!");
})

const container = document.querySelector(".main-container");


function createBook(book){
    const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;

        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");

        title.textContent = book.title;
        title.classList.add("title");

        author.textContent = book.author;
        author.classList.add("author");

        pages.textContent = `Total Pages: ${book.pages}`;
        pages.classList.add("pages");

        const div = document.createElement("div");
        const read = document.createElement("p");
        read.classList.add("read");
        const check = document.createElement("input")
        check.type = "checkbox";
        check.checked = book.read;
        read.textContent = book.read ? "Read" : "Unread";

        if(read.textContent == "Read"){
            read.style.background = "green";
        }else{
            read.style.background = "red";
        }
        
        check.addEventListener("change", ()=>{
            book.read = check.checked;
            renderUi();
        });

        div.append(read, check);
        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.addEventListener("click", ()=>{
            library = library.filter((b)=> b.id !== book.id);
            renderUi();
    showToast("Book Removed Successfully!");

        });
        card.append(title, author, pages, div, remove);

        return card;
}

function renderUi(){
    container.innerHTML = "";
    if(library.length === 0){
        container.textContent = "Library is empty, use Add Book to fill up your library!";
        container.classList.add("empty");
        return;
    }

    container.classList.remove("empty");
    library.forEach((book)=> {
        container.appendChild(createBook(book));
    });
}

renderUi();
