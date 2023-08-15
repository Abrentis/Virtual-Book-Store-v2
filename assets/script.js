var authorEl = document.getElementById("author-name");
var isbnEl = document.getElementById("isbn");
var authorRadio = document.getElementById("author-criteria");
var isbnRadio = document.getElementById("isbn-criteria");
var authorBtnEl = document.getElementById('author-button');
var isbnBtnEl = document.getElementById('isbn-button');
authorRadio.addEventListener("click", select);
isbnRadio.addEventListener("click", select);
authorBtnEl.addEventListener("click", author_det);
isbnBtnEl.addEventListener("click", isbn_det);
//Variables to display results
var displayResultEl = document.getElementById('display-result');
var bookTitle1El = document.getElementById('book-title1');
var review1El = document.getElementById('review1');
var isbn1El = document.getElementById('isbn1');
var bookTitle2El = document.getElementById('book-title2');
var review2El = document.getElementById('review2');
var isbn2El = document.getElementById('isbn2');
var bookTitle3El = document.getElementById('book-title3');
var review3El = document.getElementById('review3');
var isbn3El = document.getElementById('isbn3');
var isbnImgContainer = document.getElementById('img-container');
var authorNameISBNEl = document.getElementById('isbn-author-display');
var bookTitleISBNEl = document.getElementById('isbn-title-display');
var isbnNumberISBNEl = document.getElementById('isbn-number-display');
var isbnFooterEl = document.getElementById('isbn-footer');
var errorMessageEl = document.getElementById('error-message');
console.log(localStorage);


// Function that works with the radio buttons to enable and disable the input fields and buttons for "Author" and "ISBN."
authorEl.disabled = true;
authorBtnEl.disabled = true;
isbnEl.disabled = true;
isbnBtnEl.disabled = true;
function select (){
  var selected = document.querySelector('input[name=criteria]:checked').value;
  console.log(selected);
  if (selected === "isbn"){
    authorEl.disabled = true;
    authorBtnEl.disabled = true;
    isbnEl.disabled = false;
    isbnBtnEl.disabled = false;
    authorEl.value = "";
  }
  if (selected === "author"){
    isbnEl.disabled = true;
    isbnBtnEl.disabled = true;
    authorEl.disabled = false;
    authorBtnEl.disabled = false;
    console.log(authorEl.value);
    isbnEl.value = "";
  }
}

// Function that clears out the display area so that new search results display on the screen.
function clearDisplay() {
  authorNameISBNEl.innerHTML = "";
  bookTitleISBNEl.innerHTML = "";
  isbnNumberISBNEl.innerHTML = "";
  bookTitle1El.innerHTML = "";
  bookTitle2El.innerHTML = "";
  bookTitle3El.innerHTML = "";
  review1El.innerHTML = "";
  review2El.innerHTML = "";
  review3El.innerHTML = "";
  isbn1El.innerHTML = "";
  isbn2El.innerHTML = "";
  isbn3El.innerHTML = "";
  isbnImgContainer.innerHTML = "";
  errorMessageEl.innerHTML = "";
}

// Function that searches for an author and displays results for the first 3 books.
function author_det() {
  clearDisplay();
  console.log(authorEl.value);
  var authorURL = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${authorEl.value}&api-key=lOcvPik3JyP8fGFQLOa6ZMb5qa0buQUQ`
  console.log(authorURL);
   const encodedAuthorURL = encodeURI(authorURL);
   fetch(encodedAuthorURL)
   .then(function (response) {
    if (!response.ok) {
      throw response.json();
   }

   return response.json();
 })
 .then(function (data) {
  console.log(data);

  if (data.results[0] !== undefined) {
    bookTitle1El.append("Book Title:  " + data.results[0].book_title);
    isbn1El.append("ISBN: " + data.results[0].isbn13[0]);
    review1El.setAttribute('href',data.results[0].url);
    review1El.append(data.results[0].url);
  }
  else {
   errorMessageEl.innerHTML = "Author not Found. Please verify the author's full name";
   errorMessageEl.classList.add("has-text-danger");
   errorMessageEl.classList.add("is-size-3");
  }

  if (data.results[1] !== undefined) {
    bookTitle2El.append("Book Title:  " + data.results[1].book_title);
    isbn2El.append("ISBN: " + data.results[1].isbn13[0]);
    review2El.setAttribute('href',data.results[1].url);
    review2El.append(data.results[1].url);
  }

  if (data.results[2] !== undefined) {
    isbn3El.append("ISBN: " + data.results[2].isbn13[0]);
    bookTitle3El.append("Book Title:  " + data.results[2].book_title);
    review3El.setAttribute('href',data.results[2].url);
    review3El.append(data.results[2].url);
  }
 })

 .catch(function (error) {
   console.error(error);
 });
}

// Function that performs the ISBN search to display the book's cover image and adds the ISBN to the search history.
function isbn_det(){
  clearDisplay();
  console.log(isbnEl.value);
  // Displays image and book information
  var isbnValue =  isbnEl.value;
  var isbnURL = `https://openlibrary.org/search.json?q=${isbnEl.value}`
  const encodedisbnURL = encodeURI(isbnURL);
  fetch(encodedisbnURL)
  .then(function (response) {
   if (!response.ok) {
    throw response.json();
  }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    authorNameISBNEl.append("Author: " + data.docs[0].author_name);
    console.log(authorNameISBNEl);
    bookTitleISBNEl.append("Book Title: " + data.docs[0].title);
    isbnNumberISBNEl.append("ISBN: " + data.q);
    var nISBN = Number (isbnValue);
    console.log(nISBN);
    var coverURL = `https://covers.openlibrary.org/b/isbn/${nISBN}-L.jpg`;
    console.log(coverURL);
    let img = document.createElement('img');
    img.src = coverURL;
    isbnImgContainer.append(img);
    // Adds search history
    var storageString = JSON.stringify(localStorage);
    if (localStorage.length === 0) {
      localStorage.setItem(isbnValue, data.docs[0].title + ": " + data.q);
      var isbnSearchKey = localStorage.getItem(isbnValue, data.docs[0].title + ": " + data.q);
      var isbnFooterSearch = document.createElement("p");
      isbnFooterSearch.innerHTML = isbnSearchKey;
      isbnFooterEl.append(isbnFooterSearch);
    }
    else if (!storageString.includes(isbnValue)) {
      localStorage.setItem(isbnValue, data.docs[0].title + ": " + data.q);
      var isbnSearchKey = localStorage.getItem(isbnValue, data.docs[0].title + ": " + data.q);
      var isbnFooterSearch = document.createElement("p");
      isbnFooterSearch.innerHTML = isbnSearchKey;
      isbnFooterEl.append(isbnFooterSearch);
      }
    })
  .catch(function (error) {
    console.error(error);
  })
}

// Displays stored book titles with ISBN's to the footer of the page
function renderISBN() {
  var keys = Object.keys(localStorage);
  keys.forEach((key) => {
    var query = localStorage.getItem(key);
    var searchItem = document.createElement("p");
    searchItem.innerHTML = query;
    isbnFooterEl.append(searchItem);
  })
}
renderISBN();