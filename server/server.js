var {mongoose}= require('./db/mongoose');
var {Todo}= require('./models/todo');
var {user}= require('./models/user');
var {ObjectId}= require('mongodb');

var expres= require('express');
var bodyParser= require('body-parser');

var app= expres();

const port= process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todoz', (req, res) => {

    var newTodo= new Todo({
        text: req.body.text,
        complete: req.body.complete,
        completedAt: req.body.completedAt
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (er) => {
        res.status(400).send(er);
    }).catch((er) => res.status(400).send(err));     
});

app.get('/todoz', (req, res) => {

    Todo.find().then((doc) => {
        res.send({doc});
    }, (err) => {
        res.status(400).send(err);
    }).catch((er) => res.status(400).send(err));
});

app.get('/todoz/:id', (req, res) => {

    var id= req.params.id;
    if(!ObjectId.isValid(id))
    return res.status(400).send('Invalid ID');

    Todo.findById(id).then((docc) => {
        if(!docc)
        return res.status(400).send('ID Not Found');
        res.send(({docc}));
    }).catch((err) => res.status(400).send('Some Error Occured'));

});

app.delete('/todoz/:id', (req,res) => {
    
    var id= req.params.id;

    if(!ObjectId.isValid(id))
    return res.status(404).send('Invalid Id');

    Todo.findByIdAndRemove(id).then((docs) => {
        if(!docs)
        return res.status(404).send('Document Not Found');
        res.send((JSON.stringify(docs, undefined, 2)));
    }).catch((err) => res.status(400).send('Error Occured'));
});

app.listen(port, () => {
    console.log(`Started Up At ${port}`);  
}) 
