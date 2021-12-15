'use strict';

const Book = require('./bookModel');

async function handleGetBooks(req, res) {
    let searchParameters = {};
    if(req.query.email){
        searchParameters = { email : req.query.email}
    }

    try{
        const booksFromDB = await Book.find(searchParameters);
        if (booksFromDB.length > 0){
            res.status(200).send(booksFromDB);
        } else {
            res.status(404).send('no books here');
        }
    } catch(e) {
        res.status(500).send('server error');
    }
}

module.exports = handleGetBooks;