var moviesContainer = document.querySelector('.movies-container'),
    inputNode = document.querySelector('input')

var handleRetrievedData = function(apiResponse) {
    var htmlString = ''
    var moviesArray = apiResponse.Search
    for ( var i = 0; i < moviesArray.length; i ++) {
        var movieObject = moviesArray[i]

        var imgURL = movieObject.Poster
        if (imgURL === "N/A") {
            imgURL = 'https://designgutter.files.wordpress.com/2011/01/screen-shot-2011-01-27-at-4-26-32-pm.png'
        }

        htmlString += '<div class="movie">'
        htmlString += '<img src="' + imgURL + '">'
        htmlString += '<h1 class="title">' + movieObject.Title + '</h1>'
        htmlString += '<p class="year">' + movieObject.Year + '</p>'
        htmlString += '</div>'
    }
    // put htmlString in moviesContainer
    moviesContainer.innerHTML = htmlString
    // cannot set property innerHTML of null
}

var searchMovies = function(searchTerm) {
    var omdbUrl = 'http://omdbapi.com/?s=' + searchTerm
    var promise = $.getJSON(omdbUrl)
    promise.then(handleRetrievedData)
}

var handleKeyPress = function(eventObject) {
    //we need to know whether enter was pressed
    if (eventObject.keyCode === 13) {
        // get what the user inputted 
        var inputNode = eventObject.target,
            searchTerm = inputNode.value
        searchMovies(searchTerm)
    }
}

inputNode.addEventListener('keydown', handleKeyPress)

