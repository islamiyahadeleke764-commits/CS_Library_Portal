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
}