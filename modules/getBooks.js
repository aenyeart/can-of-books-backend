'use strict';

const verifyUser = require('../auth');
const Book = require('./bookModel');

function handleGetBooks(req, res) {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      try {
        const booksFromDB = await Book.find({ email: user.email });
        if (booksFromDB.length > 0) {
          res.status(200).send(booksFromDB);
        } else {
          res.status(404).send('no books here');
        }
      } catch (e) {
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = handleGetBooks;