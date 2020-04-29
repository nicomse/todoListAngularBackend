const mongoose = require('mongoose');
var Task = mongoose.model('Task',{
    title: {type: String},
})

module.exports = {
    Task
};