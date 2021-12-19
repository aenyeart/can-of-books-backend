'use strict';
const verifyUser = require('../auth');
const Book = require('./bookModel');

function handlePostBook(req, res) {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      try {
        const bookToAdd = await Book.create(req.body);
        res.status(200).send(bookToAdd);

      } catch (e) {
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = handlePostBook;