var {mongoose}= require('./db/mongoose');
var {Todo}= require('./models/todo');
var {User}= require('./models/user');
var {authenticate}= require('./middleware/authenticate');

const {ObjectId}= require('mongodb');
const expres= require('express');
const _= require('lodash');
const bodyParser= require('body-parser');

var app= expres();

const port= process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todoz', authenticate, (req, res) => {

    var newTodo= new Todo({
        text: req.body.text,
        complete: req.body.complete,
        completedAt: req.body.completedAt,
        _creator: req.user._id 
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (er) => {
        res.status(400).send(er);
    }).catch((er) => res.status(400).send(err));     
});

app.get('/todoz', authenticate, (req, res) => {

    Todo.find({
        _creator: req.user._id
    }).then((doc) => {
        res.send({doc});
    }, (err) => {
        res.status(400).send(err);
    }) });

app.get('/todoz/:id', authenticate, (req, res) => {

    var id= req.params.id;
    if(!ObjectId.isValid(id))
    return res.status(400).send('Invalid ID');

    Todo.findById({
        _id: id,
        _creator: req.user.id
    }).then((docc) => {
        if(!docc)
        return res.status(400).send('ID Not Found');
        res.send(({docc}));
    }).catch((err) => res.status(400).send('Some Error Occured'));

});

app.delete('/todoz/:id', authenticate, (req,res) => {
    
    var id= req.params.id;

    if(!ObjectId.isValid(id))
    return res.status(404).send('Invalid Id');

    Todo.findByIdAndRemove({
        _id: id,
        _creator: req.user.id
    }).then((docs) => {
        if(!docs)
        return res.status(404).send('Document Not Found');
        res.send((JSON.stringify(docs, undefined, 2)));
    }).catch((err) => res.status(400).send('Error Occured'));
});

//patch is used when you have to update a document
app.patch('/todoz/:id', authenticate, (req,res) => {
    var id= req.params.id;
    var body= _.pick(req.body, ['text', 'complete']);

    if(!ObjectId.isValid(id))
    return res.status(404).send('Invalid Id');

    if(_.isBoolean(req.body.complete) && body.complete )
    body.completedAt= new Date().getTime();
    else{
        body.complete= false;
        body.completedAt= null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user.id
    }, { $set: body }, { new: true }).then((docc) => {
        if(!docc)
        return res.status(404).send('Id Not Found');

        res.send({docc});
    }).catch((err) => res.status(400).send('Error Occured'));
});

app.post('/users', (req, res) => {

    var body= _.pick(req.body, ['email', 'password']);
    var user= new User(body);

    user.save().then((user) => {
        return user.authToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => res.status(400).send(err));
})
 
app.get('/users/me', authenticate, (req, res) => {

    res.send(req.user);
});

app.post('/users/login', (req, res) => {

    var body= _.pick(req.body, ['email','password']);

    User.findByCredentials(body.email, body.password).then((docc) => {
       return docc.authToken().then((token) => {
        res.header('x-auth', token).send(docc);
    })
    }).catch((err) => res.send(err));

});

app.delete('/users/me/token', authenticate, (req, res) => {

    req.user.removeToken(req.token).then(() => {
        res.status(200).send('Deleted');
    }, () => {
        res.status(400).send('Cannot Be Deleted');
    })
})

app.listen(port, () => {
    console.log(`Started Up At ${port}`);  
}) 
