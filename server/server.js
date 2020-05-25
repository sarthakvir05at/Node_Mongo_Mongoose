var {mongoose}= require('./db/mongoose');
var {Todo}= require('./models/todo');
var {user}= require('./models/user');

var expres= require('express');
var bodyParser= require('body-parser');

var app= expres();
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
    })    
});

app.listen(3000, () => {
    console.log('Listening At Port 3000');  
}) 
