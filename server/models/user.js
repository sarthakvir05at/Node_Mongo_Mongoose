const mongoose= require('mongoose');
const validator= require('validator');
const jwt= require('jsonwebtoken');
const _= require('lodash');

var UserSchema= new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        //here we set a custom validator which checks if the email is valid or not using validate object and using isEmail method 
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{Value} is not a valid email'
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON= function () {
    var user= this;
    var userObj= user.toObject();

    return _.pick(userObj, [ '_id' , 'email' ]);
}

UserSchema.methods.authToken = function () {
    var user= this;
    var access= 'auth';
    var token= jwt.sign({ _id: user._id.toHexString(), access }, 'colonise').toString();

    // user.tokens.push({ access,tokens });  => This One Doesnt Work So We Implement Other One

    user.tokens= user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token
    });
}

var User= mongoose.model('User', UserSchema );

module.exports= { User }