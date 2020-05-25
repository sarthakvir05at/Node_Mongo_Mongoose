var mongoose= require('mongoose');

var user= mongoose.model('user', {
    text: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    location: {
        type: String,
        default: 'Indore',
        trim: true
    }
})

module.exports= { user }