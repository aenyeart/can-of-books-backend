'use strict';
const verifyUser = require('../auth');
const Book = require('./bookModel');

async function handlePutBook(req, res) {
  const id = req.params.id;
  const updatedBookObj = req.body;
  verifyUser(req, (err, user) => {
    const email = user.email;
    if (err) {
      res.send('invalid token');
    } else {

      try {
        const bookToBeUpdated = await Book.findById(id);
        if (bookToBeUpdated.email === email) {
          try {
            const updatedBook = await Book.findByIdAndUpdate(id, updatedBookObj, { new: true, overwrite: true });
            res.status(202).send(updatedBook);
          } catch (error) {
            res.status(500).send('Server Error');
          }
        } else res.status(401).send('That is not yours to change!');
      } catch (error) {
        res.status(404).send('That book does not exist!');
      }
    }
  })
}


module.exports = handlePutBook;