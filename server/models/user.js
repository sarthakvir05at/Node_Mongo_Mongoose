const mongoose= require('mongoose');
const validator= require('validator');
const jwt= require('jsonwebtoken');
const _= require('lodash');
const bcrypt= require('bcryptjs');

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

UserSchema.statics.getAuthToken= function (token) {
    var User= this;
    var decoded;
    try
    {   decoded= jwt.verify(token, 'colonise');    }
    catch(e)
    { return Promise.reject(); }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth' 
    });
};

UserSchema.statics.findByCredentials= function (email, password) {
    var User= this;

    return User.findOne({ email }).then((docs) => {
        if(!docs)
        return Promise.reject();
        
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, docs.password, (err, res) => {
                if(res)
                resolve(docs);
                else
                reject();
            })
        })
    })
}

UserSchema.methods.removeToken= function (token) {
    var user= this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    })
}

// pre is used to perform a task before some event, in this case, it will run before saving it
UserSchema.pre('save', function (next) {
    var user= this;
    
    if(user.isModified('password'))
    {
        var pass= user.password;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                user.password= hash;
                next();
            })
        })
    } else {
        next();
    }
})

var User= mongoose.model('User', UserSchema );

module.exports= { User }