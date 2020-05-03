const mongoose = require('mongoose');

var User = mongoose.model('User',{
    user: {type: String},
    password: {type:String}
});

module.exports = {
    User
};