const routes = require('./routes/routes');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
//get database url from .env
const database_url = process.env.DB_URL;

mongoose.set('strictQuery', false);
mongoose.connect(database_url);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Connected to database');
})
const app = express();

app.use(express.json());

app.use('/api', routes)












//Port to listen
app.listen(8080, () => {
    console.log(`App started on port ${8080}`)
})