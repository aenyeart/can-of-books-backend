'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const handleGetBooks = require('./modules/getBooks');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_DB_LIVE_URL);

const Book = require('./modules/bookModel.js'); // do we need here?

app.get('/test', (request, response) => {
  response.send('test request received');
})

app.get('/books', handleGetBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
