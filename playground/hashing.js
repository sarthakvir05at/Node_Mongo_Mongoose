const {SHA256}= require('crypto-js');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

    var password= '123abc';
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(password, salt, (err,hash) => {
            console.log(hash);
        })
    })

    var pass= '$2a$10$qkfQop32dHQciQZ6eLdecun3dWM/JAE9t7dNIoCl7BD/gpS3K7c/6';
    bcrypt.compare(password, pass, (err, res) => {
        console.log(res);
    });
    
// var data= {
//     id: 10
// }

// var token= jwt.sign(data, 'colonise');

// var result= jwt.verify(token, 'colonise');
// console.log(token);

// var message= 'This Is User 1 ';
// var hash= SHA256(message).toString();

// console.log(`Message is: ${message}`);
// console.log(`Hashed is: ${hash}`);