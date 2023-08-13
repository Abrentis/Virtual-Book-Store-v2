var authorEl = document.getElementById("author-name");
var isbnEl = document.getElementById("isbn");
var submitEl = document.getElementById('submit');
var authorBtnEl = document.getElementById('author-button');
var isbnBtnEl = document.getElementById('isbn-button');
submitEl.addEventListener("click", select);
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
var isbnImg = document.getElementById('display-img');
var isbnFooterEl = document.getElementById('isbn-footer');

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
    console.log(authorEl);
  }
  if (selected === "author"){
    isbnEl.disabled = true;
    isbnBtnEl.disabled = true;
    authorEl.disabled = false;
    authorBtnEl.disabled = false;
    console.log(authorEl.value);
  }
}

// Function that clears out the display area so that new search results display on the screen.
function clearDisplay() {
  bookTitle1El.innerHTML = "";
  bookTitle2El.innerHTML = "";
  bookTitle3El.innerHTML = "";
  review1El.innerHTML = "";
  review2El.innerHTML = "";
  review3El.innerHTML = "";
  isbn1El.innerHTML = "";
  isbn2El.innerHTML = "";
  isbn3El.innerHTML = "";
  isbnImg.innerHTML = "";
}

// Function that searches for an author and displays results for the first 3 books.
function author_det() {
  clearDisplay();
  console.log(authorEl.value);
  var authorURL = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${authorEl.value}&api-key=lOcvPik3JyP8fGFQLOa6ZMb5qa0buQUQ`
   const encodedAuthorURL = encodeURI(authorURL);
   fetch(encodedAuthorURL)
   .then(function (response) {
    if (!response.ok) {
      throw response.json();
   }

   return response.json();
 })
 .then(function (data) {
   for (var i=0; i<1; i=i+1) {
    
     console.log(data.results[0].book_title);
     console.log(data.results[0].url);
     console.log(data.results[0].isbn13[0]);
     bookTitle1El.append(data.results[0].book_title);
     review1El.setAttribute('href',data.results[0].url);
     review1El.append(data.results[0].url);
     isbn1El.append(data.results[0].isbn13[0]);

     console.log(data.results[1].book_title);
     console.log(data.results[1].url);
     console.log(data.results[1].isbn13[0]);
     bookTitle2El.append(data.results[1].book_title);
     review2El.setAttribute('href',data.results[1].url);
     review2El.append(data.results[1].url);
     isbn2El.append(data.results[1].isbn13[0]);

     console.log(data.results[2].book_title);
     console.log(data.results[2].url);
     console.log(data.results[2].isbn13[0]);
     bookTitle3El.append(data.results[2].book_title);
     review3El.setAttribute('href',data.results[2].url);
     review3El.append(data.results[2].url);
     isbn3El.append(data.results[2].isbn13[0]);
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
  // Displays image
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
    var nISBN = Number (isbnEl.value);
    var coverURL = `https://covers.openlibrary.org/b/isbn/${nISBN}-L.jpg`;
    console.log(coverURL);
    let img = document.createElement('img');
    img.src = coverURL;
    isbnImg.append(img);
  })
  .catch(function (error) {
    console.error(error);
  });
  //Adds search history
  var intIsbn = parseInt(isbnEl.value);
  console.log(intIsbn);
  console.log(typeof(intIsbn));
  var localResultUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${intIsbn}&api-key=lOcvPik3JyP8fGFQLOa6ZMb5qa0buQUQ`
  fetch(localResultUrl)
  .then(function (response) {
  if (!response.ok) {
    throw response.json();
  }
    return response.json();
  })
  .then(function (data) {
  var dateIndex = "isbn-local" + Date.now().toString();
  console.log(data); 
  console.log(data.results[0].book_author); 
  console.log(data.results[0].book_title); 
  
  selectObj = {isbn: isbnValue, BookTitle: data.results[0].book_title, Author: data.results[0].book_author};
  localStorage.setItem(dateIndex, Object.values(selectObj)[1] + ": " + Object.values(selectObj)[0]);
  var isbnSearchKey = localStorage.getItem(dateIndex, Object.values(selectObj)[1] + ": " + Object.values(selectObj)[0]);
  var isbnFooterSearch = document.createElement("p");
  isbnFooterSearch.innerHTML = isbnSearchKey;
  isbnFooterEl.append(isbnFooterSearch);
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

//j%20k%20rowling
//"OL23919A", Toni Morrison, JK Rowling, Sam Harris, Richard Dawkins