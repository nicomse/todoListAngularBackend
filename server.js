//import
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { mongoose } = require('./db');
const cors = require('cors')


//controllers
var taskController = require('./controllers/taskController');

var app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

//app.use
app.use(bodyParser.json());
app.use('/tasks',taskController)
app.use(cors(corsOptions)); 


app.listen(3000, () => console.log('Server running on port 3000'))
