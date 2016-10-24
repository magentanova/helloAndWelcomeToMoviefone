// verify that I have included the jquery library
console.log($)

// verify that i have included the Backbone library
console.log(Backbone)


// set a DOM node for the movies-container in HTML
var moviesContainer = document.querySelector('.movies-container'),
    //set a DOM node for the input div in HTML
    inputNode = document.querySelector('input')


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
    return promise
}

// create a function for an event listener 
var handleKeyPress = function(eventObject) {
    //we need to know whether enter was pressed| to do this we need to grab the keyboard code for enter
    if (eventObject.keyCode === 13) {
        // get what the user inputted 
        var inputNode = eventObject.target,
        //assigns a value to searchTerm which === the string we type into the input box
            searchTerm = inputNode.value
        //invoke searchMovies function with our new searchTerm
        location.hash = 'search/' + searchTerm  
        inputNode.value = ''
    }
}

var MovieRouter = Backbone.Router.extend({
    // define the routes that will navigate the app
    // properties are hash properties, values are 
    // names of methods on the router.
    routes: {
        "home": "handleHome",
        "search/:term": "handleQuery",
        "*default": "routeToHome"
    },

    //define a handler function for each route
    handleHome: function() {
        moviesContainer.innerHTML = '<marquee>HELLO AND WELCOME TO MOVIEFONE</marquee>'
    },

    handleQuery: function(term) {
        var promise = searchMovies(term)
        promise.then(handleRetrievedData)
    },

    routeToHome: function() {
        location.hash = 'home'
    },

    initialize: function() {
        Backbone.history.start()
    }
})

var router = new MovieRouter()
console.log(router)

// set up that event listener to be run when the keydown event fires in the inputNode
inputNode.addEventListener('keydown', handleKeyPress)

