var searchBar = $("form");
var searchURLq = "https://openlibrary.org/search.json?q=";
var searchURLAuthor = "https://openlibrary.org/search.json?author=";
var searchURLTitle = "https://openlibrary.org/search.json?title=";
localStorage.clear();
var authorEl = document.getElementById("author-name");
var isbnEl = document.getElementById("isbn");
var submitEl = document.getElementById('submit');
var authorBtnEl = document.getElementById('author-button'); 
var authorBtnEl = document.getElementById('author-button');
var isbnBtnEl = document.getElementById('isbn-button');
var aResEl = document.getElementById('aRes');
submitEl.addEventListener("click", select);
authorBtnEl.addEventListener("click", author_det);
isbnBtnEl.addEventListener("click", isbn_det);

function search(event) {
    event.preventDefault();
    var input = $("input").val().trim();
    var inputURLFormat = input.replace(/\s/g, "+");
    var inputURL = searchURLGeneral + inputURLFormat;
    fetch(inputURL)
        .then(function (response) {
            console.log(response.status);
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.docs.length; i++) {
            localStorage.setItem("book" + i, data.docs[i].title);
            }
            console.log(localStorage);
            console.log(data);
        });
}
searchBar.on("submit", search);


function initDropdowns() {
  var $document = $(document);

  /**
   * hide dropdown menu if user clicks away from dropdown
  */
  $document.on('click', function () {
    $(".dropdown.is-active").removeClass("is-active");
  });
  
  /**
   * show and hide dropdown menu on clicked button
   */
  $document.on('click', ".dropdown .button", function (event) {
    event.stopPropagation();
    $(event.target).closest(".dropdown").toggleClass('is-active');
  });
}

/**
 * jQuery ready wrapper waits for the document to emit the DOMContentLoaded event.
 * This ensures your html exists on the DOM before querying for your elements.
 * Also prevents your variables from being accessed in the global scope.
 * 
 * All of your code could live inside that ready callback function.
 */
$(document).ready(function () {
  var $dropdownItems = $(".dropdown-item");

  initDropdowns();


  /**
   * change active dropdown item
   * removes the 'is-active' class from any active sibling element
   * adds 'is-active' to the clicked dropdown item
   */
  $dropdownItems.on("click", function (event) {
    console.log(event.target);
    var $item = $(event.target);
    $item.siblings().removeClass("is-active");
    $item.addClass("is-active");
  });
})
url = "";
var authorEl = document.getElementById("author-name");
var isbnEl = document.getElementById("isbn");

var submitEl = document.getElementById('submit');


submitEl.addEventListener("click", select);

function select (){
  var selected = document.querySelector('input[name=criteria]:checked').value;
  console.log(selected);
  if (selected === "isbn"){
    document.getElementById("author-name").disabled = true;
    document.getElementById("isbn").disabled = false;
  }
  if (selected === "author"){
    document.getElementById("isbn").disabled = true;
    document.getElementById("author-name").disabled = false;
  }
}


function select (){
  var selected = document.querySelector('input[name=criteria]:checked').value;
  console.log(selected);
  if (selected === "isbn"){
    document.getElementById("author-name").disabled = true;
    document.getElementById("isbn").disabled = false;
    console.log(authorEl);
  }
  if (selected === "author"){
    document.getElementById("isbn").disabled = true;
    document.getElementById("author-name").disabled = false;
    console.log(authorEl.value);
  }
}

function author_det() {
     console.log(authorEl.value);
     var authorURL = `https://openlibrary.org/search/authors.json?q=${authorEl.value}`
      const encodedAuthorURL = encodeURI(authorURL);
      fetch(encodedAuthorURL)
      .then(function (response) {
       if (!response.ok) {
         throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      //aResEl.textContent = locRes.search.query;

      console.log(locRes);
      var workId = locRes.docs[0].key;
      console.log(workId);
      getWork(workId);
      
    })
    .catch(function (error) {
      console.error(error);
    });
}

function isbn_det(){
  console.log(isbnEl.value);
}

//j%20k%20rowling
//"OL23919A", Toni Morrison, JK Rowling, Sam Harris, Richard Dawkins

    function getWork (workID) {
    var workURL = `https://openlibrary.org/authors/${workID}/works.json?limit=10`
    var ratingURL = `https://openlibrary.org/works/${workID}/ratings.json`
    fetch(workURL)
    .then (function (response){
      if (response.ok){
        return response.json();
      }
    })  
    .then(function (data) {
      console.log(data); 
      //console.log(data.entries.length);
      for (var i=0; i<data.entries.length; i=i+1) {
        console.log(data.entries[i].title);
      }
      
    })
    
    /*fetch(ratingURL)
    .then (function (response){
      if (response.ok){
        return response.json();
      }
    })  
    .then(function (data) {
      console.log(data);  
    })*/
    
    
  }

