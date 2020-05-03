const express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var { User } = require('../models/user');

// POST users/
router.post('/signup',(req,res) =>{
    console.log(req.body);
    var user = new User({
        email: req.body.email,
        password: req.body.password //@todo hash it
    });
    user.save((err,doc)=>{
        if(!err) {
            const token = jwt.sign({_id: user._id}, 'secretkey');
            res.status(200).send(token);
        }
        else(console.log('Error saving the User ' + JSON.stringify(myTask)))
    });  
}); 

// POST users/
router.post('/signin',async (req,res) =>{
    const {email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) {return res.status(401).send("Error signing in")};
    if(user.password !== password){return res.status(401).send("Error signing in")}; //@todo hashear passwords
    const token = jwt.sign({_id: user._id}, 'secretkey');
    res.status(200).send(token);    
}); 

module.exports = router;