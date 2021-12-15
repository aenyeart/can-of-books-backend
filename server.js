'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_LIVE_URL);

const handleGetBooks = require('./modules/getBooks');
const handlePostBooks = require('./modules/postBooks');

const Book = require('./modules/bookModel.js'); // do we need here?

app.get('/test', (request, response) => {
  response.send('test request received');
})

app.get('/books', handleGetBooks);
app.post('/books', handlePostBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
