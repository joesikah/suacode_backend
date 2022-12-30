const routes = require('./routes/routes');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
//get database url from .env
const database_url = process.env.DB_URL;

mongoose.set('strictQuery', false);

//connect to db
mongoose.connect(database_url);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Connected to database');
})

//express
const app = express();

app.use(express.json());

app.use('/api', routes)

//add cors
app.use(cors());









//Port to listen
app.listen(process.env.PORT || 8080, () => {
    console.log(`App started on port ${8080}`)
})