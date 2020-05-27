var { Todo }= require('./../server/models/todo');
var { mongoose }= require('./../server/db/mongoose');

//To Remove All Of The Documents From The Collection 
// Todo.remove({}).then((result) => {
//     console.log(result);
// }).catch((err) => console.log(err));

//To Remove A Document By A Property
Todo.findOneAndRemove({ _id: '5ecd6952ae7d1c00171e0562'}).then((result) => {
    console.log(result);
}).catch((err) => console.log(err));

//To Remove A Document By ID Property
// Todo.findByIdAndRemove({ _id: '5ecd6952ae7d1c00171e0562' }).then((result) => {
//     console.log(result);
// }).catch((err) => console.log(err));