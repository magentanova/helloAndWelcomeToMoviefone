//pulling the movies-container node from HTML
var moviesContainer = document.querySelector('.movies-container'),
    // created input node that creates a text box for a search
    inputNode = document.querySelector('input')

//Initiated the function that manipulates the api response. please keep in mind that we do not call the api response ourselves
var handleRetrievedData = function(apiResponse) {
    // create a empty string that will eventually populate with your search results
    var htmlString = ''
    // create a variable name for searching the api response for better usability
    var moviesArray = apiResponse.Search
    //at every index in the movies array for the length of the array
    for ( var i = 0; i < moviesArray.length; i ++) {
        // our movie object will become  movie array at the index | 
        //this will return an array of objects for each movie in your results 
        // at every index we are creating a new object within this array (for each movie)
        var movieObject = moviesArray[i]
        // while within the loop we want to create a image variable 
        var imgURL = movieObject.Poster
        //if the image variable is N/A then we will 
        if (imgURL === "N/A") {
            //put this url in it's place
            imgURL = 'https://designgutter.files.wordpress.com/2011/01/screen-shot-2011-01-27-at-4-26-32-pm.png'
            //exit the loop
        }
        // in this section we are going to add the HTML syntax to the empty string for each api response
        htmlString += '<div class="movie">'
        // add a poster image
        htmlString += '<img src="' + imgURL + '">'
        // include the title of the movie... movieObject.Title indicates the 'title' property of the 
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
//create the function that allows the input box to actually work
var searchMovies = function(searchTerm) {
    // add the search term to the end of the url 
    var omdbUrl = 'http://omdbapi.com/?s=' + searchTerm
    //establish the promise to hold the data to be used at a later time
    var promise = $.getJSON(omdbUrl)
    //actually define what should be done with the promise once it is available
    promise.then(handleRetrievedData)
}

// create a function for an event listener 
var handleKeyPress = function(eventObject) {
    //we need to know whether enter was pressed| to do this we need to grab the keyboard code for enter
    if (eventObject.keyCode === 13) {
        // get what the user inputted 
        var inputNode = eventObject.target,
            // assigns a value to searchTerm which === the string we type into the input box
            searchTerm = inputNode.value
            //invoke searchMovies function with our new searchTerm
        searchMovies(searchTerm)
    }
}
//invoke the event listener 
inputNode.addEventListener('keydown', handleKeyPress)

