console.log('JS is working.');
$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery is working.');
    getAllMovies();
}

function geAllMovies() {
    // We are going to use jquery's .aja method to request
    // the movies from our server.
    // this is a GET request.
    // the request is made to /movies
    $.ajax({
        method: 'GET',
        url: '/movies',
    })
    // .then is what happens when the server request comes back successfully.
    .then(function (response) {
        console.log(`This response:`, response);
    })
    // .catch happens if the server request does not come back successful.
    .catch(function (error) {
        console.log('Error in request to server for movies:', error);
        
    })
    console.log('in code after ajax call');
    
}//end function