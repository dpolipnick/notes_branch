const express = require('express');
const bodyParser = require('body-parser');

// node module that will connect to postgesql
const pg = require('pg');

// Setup PG to connect to the database
const Pool = pg.Pool;
const pool = new Pool({
    database: 'movies', // database name (this will change)
    host: 'localhost', // where to find the database
    port: 5432, // port for finding the database
    max: 10, // ma number of connections for the pool
    idleTimeoutMillis: 3000 // 30 seconds before timeout/cancel query
});

// listeners setup on the pool instn' required,
// but can be super handy for troubleshooting.
pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (error) => {
    console.log('Error with database pool', error); 
});

// setup express as usual
const app = express();

// setup body parser
app.use(bodyParser.urlencoded({etended: ture}));
app.use (bodyParser.json());

// Static files (might not get to setting up a client, but tjust in case)
app.use(express.static('server/public'));

// Setup a GET route to get all the movies from the database
app.get('/movie', (req, res)=> {
    const sqlText = `SELECT * FROM movies ORDER BY rank ASC`;
});

// Setup DELETE route to database to remove a movie
// we are using a request parameter (req.params) to identify
// the song we want to delete. We expect this will be an id
// from the database.
app.delete('/movies/:id', (req, res)=>{
    let reqId = req.params.id;
    console.log('Inside DELETE request on server side fro reqId:', reqId);
    res.sendStatus(200);
});

// Setup a POST route to add a new movie to the database

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Express is listening on port ${port}...`);
});

// Set up array of movies to serve/send back to the client browsers
const movies = [
    {
        title: 'Transformers',
        genre: 'Action',
        rank: 4
    },
    {
        title: 'Lord of the Rings',
        genre: 'Fantasy',
        rank: 1
    },
    {
        title: 'Black Panther',
        genre: 'Superhero',
        rank: 2
    },
    {
        title: 'Ferris Buelers Day Off',
        genre: 'Comedy',
        rank: 3
    },
];

// Send back all the moview when a GET request is made to /movies
// app.get because it is a GET request
app.get('/movies', function(req, res){
    console.log(`GET request for all the movies`);
    res.send(movies);
    
});
