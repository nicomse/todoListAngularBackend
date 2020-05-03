const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tasksDB', {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {
        console.log('Mongo db connection succeded...');
    }else {  
        console.log('Mongo db connection error,' + JSON.stringify(err));
    }
});

module.exports = mongoose;