'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./modules/bookModel.js');

async function seed() {
  mongoose.connect(process.env.MONGO_DB_LIVE_URL);

  await Book.create({
    title: 'Consider Phlebas',
    description: 'Science fiction book',
    status: 'read',
    email: 'eriksavage@fake-email.com',
  }); 
  
  await Book.create({
    title: 'The Wisdom of Insecurity',
    description: 'Awesome philosophy',
    status: 'unread',
    email: 'aenyeart@fake-email.com',
  }); 

  await Book.create({
    title: 'Consolations',
    description: 'A poetic catalog of the human experience',
    status: 'read',
    email: 'aenyeart@fake-email.com',
  }); 

  mongoose.disconnect();
}

seed();

function test(){
  console.log(process.env.MONGO_DB_LIVE_URL);
}

