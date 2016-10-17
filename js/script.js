// set a DOM node for the movies-container in HTML
var moviesContainer = document.querySelector('.movies-container'),
    //set a DOM node for the input div in HTML
    inputNode = document.querySelector('input')

var handleRetrievedData = function(apiResponse) {
    //create an empty string that you will eventually populate with your search results
    var htmlString = ''
    //create a variable for searching the api response for better usability
    var moviesArray = apiResponse.Search
    //at every index in the movies array for the length of the array
    for (var i = 0; i < moviesArray.length; i ++) {
        //this will return an array of objects for each movie in your results
        var movieObject = moviesArray[i]
        //include an image that will display if the search results don't return a poster
        var imgURL = movieObject.Poster
        //is the poster link listed as "N/A"?
        if (imgURL === "N/A") {
            //well, then replace "N/A" with the image below
            imgURL = 'https://designgutter.files.wordpress.com/2011/01/screen-shot-2011-01-27-at-4-26-32-pm.png'
        }
            //create "result" to plug in your search returns
        htmlString += '<div class="movie">'
        //add a poster image
        htmlString += '<img src="' + imgURL + '">'
        //include the title of the movie... movieObject.Title indicates the 'title' property of the
        //movie object
        htmlString += '<h1 class="title">' + movieObject.Title + '</h1>'
        //add the year the movie was released
        htmlString += '<p class="year">' + movieObject.Year + '</p>'
        //add a div to better separate all of your results
        htmlString += '</div>'
    }
    // put htmlString in moviesContainer
    moviesContainer.innerHTML = htmlString
    // cannot set property innerHTML of null
}
//create a function that will take your search term and return corresponding results
var searchMovies = function(searchTerm) {
    //create variable that combines your search term with the database return URL
    var omdbUrl = 'http://omdbapi.com/?s=' + searchTerm
    //establish the promise to hold the data to be used at a later time
    var promise = $.getJSON(omdbUrl)
    //actually define what should be done with the promise once it is available
    promise.then(handleRetrievedData)
}

//create a function for the event listener
var handleKeyPress = function(eventObject) {
    //we need to know whether enter was pressed
    if (eventObject.keyCode === 13) {
        // get what the user inputted 
        var inputNode = eventObject.target,
        //assigns a value to searchTerm which === the string we type into the input box
            searchTerm = inputNode.value
        //invoke searchMovies function with our new searchTerm
        searchMovies(searchTerm)
    }
}
//invoke the eventListener
inputNode.addEventListener('keydown', handleKeyPress)

