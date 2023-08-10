var searchBar = $("form");
var searchURLq = "https://openlibrary.org/search.json?q=";
var searchURLAuthor = "https://openlibrary.org/search.json?author=";
var searchURLTitle = "https://openlibrary.org/search.json?title=";
localStorage.clear();

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
var criteriaEl = document.getElementById("criteria");

//console.log(criteriaEl.value);
