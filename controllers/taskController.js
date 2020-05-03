const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Task } = require('../models/task');

// GET tasks/
router.get('/',verifyToken, (req, res) => {
    console.log('hola')
    Task.find((err,documents) => {
        if(!err) { res.send(documents); }
        else { console.log ('Error retrieving tasks. ' + JSON.stringify(err))}
    })
});


// GET tasks/:id
router.get('/:id',verifyToken, (req, res) => {
    //check if is a valid id
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record given with valid ID: ' + req.params.id);

    Task.findById(req.params.id, (err, document) => {
        if(!err) { res.send(document); }
        else { console.log ('Error retrieving tasks. ' + JSON.stringify(err))}
    })
});

// POST tasks/
router.post('/',verifyToken,(req,res) =>{
    var myTask = new Task({
        title: req.body.title
    });
    myTask.save((err,doc)=>{
        if(!err) {res.send(doc);}
        else(console.log('Error saving the Task ' + JSON.stringify(myTask)))
    });  
}); 

// PUT tasks/:id
router.put('/:id',verifyToken, (req,res) => {
    //check if is a valid id
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record given with valid ID: ' + req.params.id);
    
    var putTask = new Task({
        title: req.body.title
    });
    Task.findOneAndUpdate(req.params.id, {$set: putTask}, {new: true}, (err, document) => {
        if(!err) {res.send(document);}
        else(console.log('Error updating the Task ' + JSON.stringify(err)))
    });
});

router.delete('/:id',verifyToken, (req,res) =>{
    //check if is a valid id
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record given with valid ID: ' + req.params.id);
    
    Task.findByIdAndRemove(req.params.id, (err,document) => {
        if(!err) {res.send(document);}
        else(console.log('Error deleting the Task ' + JSON.stringify(err)))

    })
})



module.exports = router;

function verifyToken(req,res,next) {
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    const token  = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    const payload = jwt.verifyToken(token, 'secretkey');
    req.userId = payload._id;
    next();
}