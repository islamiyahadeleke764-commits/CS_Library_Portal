// 1. Toggle Book Status on Click
function toggleStatus(element) {
  const bookCard = element.closest('.book');
  
  if (element.innerHTML === "Available") {
    element.innerHTML = "Borrowed";
    element.className = "status borrowed";
    bookCard.setAttribute('data-status', 'borrowed');
  } else {
    element.innerHTML = "Available";
    element.className = "status available";
    bookCard.setAttribute('data-status', 'available');
  }
  
  // Re-run the filter in case the user is currently filtering by status
  filterBooks(); 
}

// 2. Search and Filter Logic
function filterBooks() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const filterValue = document.getElementById('statusFilter').value;
  const books = document.querySelectorAll('.book');

  books.forEach(book => {
    const title = book.querySelector('h3').innerText.toLowerCase();
    const author = book.querySelector('p').innerText.toLowerCase();
    const status = book.getAttribute('data-status');

    // Check if it matches search text
    const matchesSearch = title.includes(searchText) || author.includes(searchText);
    
    // Check if it matches the dropdown filter
    const matchesFilter = (filterValue === 'all') || (filterValue === status);

    // Show or hide the book
    if (matchesSearch && matchesFilter) {
      book.style.display = 'block'; // Show
    } else {
      book.style.display = 'none';  // Hide
    }
  });
  // ✨ POLISH: Update the counter based on how many books are visible
  let visibleCount = 0;
  books.forEach(book => {
    if (book.style.display !== 'none') {
      visibleCount++;
    }
  });
  
  const countText = document.getElementById('bookCount');
  if (countText) {
    countText.innerHTML = "Showing " + visibleCount + " book(s)";
  }}
// 3. Add a New Book Dynamically
function addBook() {
  const title = document.getElementById('newTitle').value;
  const author = document.getElementById('newAuthor').value;

  if (title === "" || author === "") {
    alert("Please enter both a title and an author!");
    return;
  }

  const bookList = document.getElementById('bookList');
  const newBook = document.createElement('div');
  newBook.className = 'book';
  newBook.setAttribute('data-status', 'available');

  newBook.innerHTML = `
    <h3>${title}</h3>
    <p>Author: ${author}</p>
    <span class="status available" onclick="toggleStatus(this)">Available</span>
  `;

  bookList.appendChild(newBook);

  document.getElementById('newTitle').value = "";
  document.getElementById('newAuthor').value = "";

  filterBooks(); 
  alert("Success! " + title + " has been added to the library.");
}