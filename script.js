let books = [
    {
        id: generateHexId(),
        title: "Lord Of the Seas",
        author: "Joe Watson",
        pages: 509,
        wasRead: false
    },
    {
        id: generateHexId(),
        title: "The Bible",
        author: "Saint Peter",
        pages: 1200,
        wasRead: true
    },
    {
        id: generateHexId(),
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        pages: 120,
        wasRead: true
    }
];

function generateHexId() {
    return Math.floor(Math.random() * 0xffffffff).toString(16);
}

function addBook(title, author, pages, wasRead) {
    const newBook = {
        id: generateHexId(),
        title: title,
        author: author,
        pages: pages,
        wasRead: wasRead
    };
    
    books.push(newBook);

    renderBooks();
}

function removeBook(id) {
    books = books.filter(book => book.id !== id);
    renderBooks();
}

function renderBooks() {
    const bookGrid = document.querySelector('.book-grid');
    
    const headerHTML = `
        <div class="grid-header">
            <div>Title</div>
            <div>Author</div>
            <div>Pages</div>
            <div>Read</div>
            <div>Remove</div> 
        </div>
    `;
    
    bookGrid.innerHTML = headerHTML;
    
    books.forEach(book => {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        row.setAttribute('id', book.id);
        
        row.innerHTML = `
            <div>${book.title}</div>
            <div>${book.author}</div>
            <div>${book.pages}</div>
            <div><input type="checkbox" class="btnRead" ${book.wasRead ? 'checked' : ''}></div>
            <div><button class="btnRemove" type="button">Remove</button></div>
        `;
        
        const removeBtn = row.querySelector('.btnRemove');
        removeBtn.addEventListener('click', () => {
            removeBook(book.id);
        });
        
        bookGrid.appendChild(row);
    });
}

const dialog = document.getElementById('bookDialog');
const addBtn = document.querySelector('.btnAdd');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');

addBtn.addEventListener('click', () => {
    bookForm.reset(); 
    dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = Number(document.getElementById('pages').value);
    const wasRead = document.getElementById('wasRead').checked;
    
    addBook(title, author, pages, wasRead);
    
    dialog.close(); 
});

renderBooks();