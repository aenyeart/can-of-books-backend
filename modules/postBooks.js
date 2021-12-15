'use strict';

const Book = require('./bookModel');

async function handlePostBooks(req, res) {
    //post books AKA create a book object and UPDATE the database
    //JSON objects go through body
    try {
        const bookToAdd = await Book.create(req.body);
        res.status(200).send(bookToAdd);

    } catch (e) {
        res.status(500).send('server error');
    }
}

module.exports = handlePostBooks;