'strict mode';
const verifyUser = require('../auth');
const Book = require('./bookModel');

async function handleDeleteBook(req, res) {
  const id = req.params.id;
  verifyUser(req, (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {

      const email = user.email;
      try {
        const bookToBeDeleted = await Book.findById(id);
        if (bookToBeDeleted.email === email) {
          try {
            await Book.findByIdAndDelete(id);
            res.status(204).send('Book successfully burned!');
          } catch (error) {
            res.status(500).send('Server Error');
          }
        } else res.status(401).send('That is not yours to delete!');
      } catch (error) {
        res.status(404).send('That book does not exist!');
      }
    }
  })
}

module.exports = handleDeleteBook;