// const MongoClient= require('mongodb').MongoClient;
// Object Restructuring means taking a property from an object and then making that property a variable i.e.
// var user= { name:'Sarthak', age: 20 }
// var {name}= user
// console.log(name) will print Sarthak over console

const {MongoClient, ObjectID}= require('mongodb');
var obj= new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoAPI', { useUnifiedTopology: true }, (err, client) => {
    if(err)
    return console.log('Unable To Connect');

    const db= client.db('TodoAPI');

    db.collection('todos').insertOne({
        text: 'Doctor Who',
        completed: true,
        completedAt: 12
    }, (err, res) => {
        if(err)
        return console.log(err);
        console.log(JSON.stringify(res, undefined, 2));
    });

    db.collection('users').insertOne({
        text: 'Sarthak Jaiswal',
        age: 20,
        location: 'Indore'
    }, (err, res) => {
        if(err)
        return console.log(err);
        console.log(JSON.stringify(res, undefined, 2));
    });

    db.collection('users').insertOne({
        name: 'Vikas Bhatia',
        age: 21,
        location: 'Indore'
    }, (err, res) => {
        if(err)
        return console.log('Record Not Inserted');
        //Basically res.ops is the array of the documents that we have inserted.
        console.log(res.ops[0]._id.getTimestamp());
        // The default id contains the first 3 bytes as its time stamp and hence we can access the time by getTimestamp()
        // through id property
    })

    // client.close();
});