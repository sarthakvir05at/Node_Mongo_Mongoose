var {mongoose}= require('./../server/db/mongoose');
var {Todo}= require('./../server/models/todo');

    var id= '5ecc274ac4fdbf1a2c0eea1a';

Todo.find({
    _id: id
}).then((docs) => {
    if(!docs)
    return console.log('Todo Not Found');
    console.log('Todo By Find ',docs);
}).catch((err) => console.log(err));

Todo.findOne({
    _id: id
}).then((res) => {
    if(!res)
    return console.log('Todo Not Found');
    console.log('Todo By FindOne ', res);
}).catch((er) => console.log(er));

Todo.findById(id).then((res) => {
    if(!res)
    return console.log('Todo Not Found');
    console.log('Todo By FindByID ', res);
}).catch((err) => console.log(err));