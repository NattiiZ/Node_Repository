// Description: CRUD operations for a book resource without a database.
// npm install express
// Run this file with node src/CRUDBookNoDB.js
// Test with Postman or browser

require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require("express");
const sqlite3 = require('sqlite3');
const app = express();

// open a database connection
const db = new sqlite3.Database('./Database/Book.sqlite');

// parse incoming requests
app.use(express.json());

// sample data
let books = [
    {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        author: "Author 1",
    },
    {
        id: 2,
        title: "Harry Potter and the Chamber of Secrets",
        author: "Author 2",
    },
    {
        id: 3,
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "Author 3",
    },
];

// route to get all books
app.get("/", (req, res) => {
    res.json(books);
});

// route to get a book by id
app.get('/books/:id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.id));
    
    if (!book)
        res.status(404).send('The book with the given ID was not found');

    res.json(book);
});

// route to add a new book
app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
    };

    books.push(book);
    res.send(book);
});

// route to update a book
app.put('/books/:id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.id));
    
    if (!book)
        res.status(404).send('The book with the given ID was not found');

    book.title = req.body.title;
    book.author = req.body.author;

    res.send(book);
});

// route to delete a book
app.delete('/books/:id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.id));
    
    if (!book)
        res.status(404).send('The book with the given ID was not found');

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.send(book);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});