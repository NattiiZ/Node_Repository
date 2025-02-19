require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
const sqlite3 = require('sqlite3');

// parse incoming requests
app.use(express.json());


// open a database connection
const db = new sqlite3.Database('./Database/Book.sqlite');

// Create a table in the database
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);


// route to get all books
app.get("/books", (req, res) => {
    db.all("SELECT * FROM books", (err, rows) => {
        if (err)
            res.status(500).send(err);
        else
            res.json(rows);
    });
});

// route to get a book by id
app.get('/books/:id', (req, res) => {
    db.all("SELECT * FROM books WHERE id = ?", req.params.id, (err, rows) => {
        if (err)
            res.status(500).send(err);
        else
        {
            if (!row)
                res.status(404).send('The book with the given ID was not found');
            else
                res.json(row);
        }
    });
});

// route to add a new book
app.post('/books', (req, res) => {
    const book = req.body;
    
    db.run("INSERT INTO books (title, author) VALUES (?, ?)", book.title, book.author, function(err) {
        if (err)
            res.status(500).send(err)
        else
        {
            book.id = this.lastID;
            res.send(book);
        }
    });
});

// route to update a book
app.put('/books/:id', (req, res) => {
    const book = req.body;

    db.run("UPDATE books SET title = ?, author = ? WHERE id = ?", book.title, book.author, req.params.id, function(err) {
        if (err)
            res.status(500).send(err);
        else
            res.send(book);
    });
});

// route to delete a book
app.delete('/books/:id', (req, res) => {
    db.run("DELETE FROM books WHERE id = ?", req.params.id, function(err) {
        if (err)
            res.status(500).send(err);
        else
            res.send({});
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});