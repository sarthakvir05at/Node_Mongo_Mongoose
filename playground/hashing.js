const {SHA256}= require('crypto-js');
const jwt= require('jsonwebtoken');

var data= {
    id: 10
}

var token= jwt.sign(data, 'colonise');

var result= jwt.verify(token, 'colonise');
console.log(token);

// var message= 'This Is User 1 ';
// var hash= SHA256(message).toString();

// console.log(`Message is: ${message}`);
// console.log(`Hashed is: ${hash}`);