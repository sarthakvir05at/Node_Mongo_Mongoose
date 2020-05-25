var mongoose= require('mongoose');

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoAPI', { useUnifiedTopology: true,  useNewUrlParser: true });

var Todo= mongoose.model('Todo', {
    text: {
    type: String,
    required: true,
    trim: true,
    },
    complete: {
        type: Boolean,
        default: false
    }, 
    completedAt: {
        type: Number,
        default: null
    }
});

var newTodo= new Todo({
    text: 'MirzaPur',
    complete: true
});

newTodo.save().then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});