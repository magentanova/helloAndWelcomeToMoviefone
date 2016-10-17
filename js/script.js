// set a DOM node for the movies-container in HTML
var moviesContainer = document.querySelector('.movies-container'),
    //set a DOM node for the input div in HTML
    inputNode = document.querySelector('input')


// EXAMPLE OF THE STRUCTURE OF THE RESPONSE FROM THE API
// {
//   "Search": [
//     {
//       "Title": "Robots",
//       "Year": "2005",
//       "imdbID": "tt0358082",
//       "Type": "movie",
//       "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDYyNjY1NjY1M15BMl5BanBnXkFtZTcwNjk5MDczMw@@._V1_SX300.jpg"
//     },
//     {
//       "Title": "War of the Robots",
//       "Year": "1978",
//       "imdbID": "tt0077640",
//       "Type": "movie",
//       "Poster": "http://ia.media-imdb.com/images/M/MV5BMTk0NzA3NzIyOF5BMl5BanBnXkFtZTcwMTYwMDc1NQ@@._V1._CR41,39,270,405_SX89_AL_.jpg_V1_SX300.jpg"
//     },
//     ]
// }

// this function will run when and only when the response comes back from the server|API. 
// it takes as input the response itself. it iterates over the movie objects in the response,
// writes a long string of HTML, and sets that HTML as the innerHTML of the .movies-container div.
var handleRetrievedData = function(apiResponse) {
    //create an empty string that you will eventually populate with your search results
    var htmlString = ''
    //create a variable for searching the api response for better usability
    // the array of movies is stored under a key called "Search" in the apiResponse. we could only
    // learn this by visually studying the JSON returned by the API.
    var moviesArray = apiResponse.Search
    //at every index in the movies array for the length of the array
    for (var i = 0; i < moviesArray.length; i ++) {
        // the element at each index is an object representing a movie
        var movieObject = moviesArray[i]
        //imgURL by default will hold the poster link that is included in the movie object
        var imgURL = movieObject.Poster
        //is the poster link listed as "N/A"?
        if (imgURL === "N/A") {
            //well, then replace "N/A" with the image below
            imgURL = 'https://designgutter.files.wordpress.com/2011/01/screen-shot-2011-01-27-at-4-26-32-pm.png'
        }
        //create opening tag of a container that will contain the html for a particular movie
        htmlString += '<div class="movie">'
        //add a poster image
        htmlString += '<img src="' + imgURL + '">'
        //include the title of the movie... movieObject.Title indicates the 'title' property of the
        //movie object
        htmlString += '<h1 class="title">' + movieObject.Title + '</h1>'
        //add the year the movie was released
        htmlString += '<p class="year">' + movieObject.Year + '</p>'
        //close the div that was opened on line 48
        htmlString += '</div>'
    }
    // put htmlString in moviesContainer
    moviesContainer.innerHTML = htmlString
}


//this function will take a search term as input and use it to initiate a request to the API
var searchMovies = function(searchTerm) {
    //create variable that combines your search term with the database return URL
    var omdbUrl = 'http://omdbapi.com/?s=' + searchTerm
    // initiates a request to the server. the promise object will manage the progress of the request.
    var promise = $.getJSON(omdbUrl)
    //tell the promise to use our function to process the data once that data becomes available
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

