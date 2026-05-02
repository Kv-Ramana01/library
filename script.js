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

submitBtn.addEventListener("click", (event)=> {
    event.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    title.value = "";
    author.value = "";
    pages.value = ""
    read.checked = false;
    formModal.classList.toggle("show");
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
        });
        card.append(title, author, pages, div, remove);

        return card;
}

function renderUi(){
    container.innerHTML = "";
    if(library.length === 0){
        return;
    }
    library.forEach((book)=> {
        container.appendChild(createBook(book));
    });
}

renderUi();
