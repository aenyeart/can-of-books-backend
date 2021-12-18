'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
const verifyUser = require('./auth.js'); // is this needed here?

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_LIVE_URL);

const handleGetBooks = require('./modules/getBooks');
const handlePostBook = require('./modules/postBooks');
const handleDeleteBook = require('./modules/deleteBook');
const handlePutBook = require('./modules/putBook');

app.get('/books', handleGetBooks);
app.post('/books', handlePostBook);
app.delete('/books/:id', handleDeleteBook);
app.put('/books/:id', handlePutBook);
app.get('/user', handleGetUser);

function handleGetUser(req, res) {
  verifyUser(req, (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      res.send(user);
    }
  })
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
