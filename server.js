//import
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { mongoose } = require('./db');
const cors = require('cors')

const port = process.env.PORT || 3000;



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


app.listen(port, () => console.log('Server running on port' + port))
