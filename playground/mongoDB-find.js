const {MongoClient, ObjectID}= require('mongodb');
var obj= new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoAPI', { useUnifiedTopology: true }, (err, client) => {
    if(err)
    return console.log('Unable To Connect');

    const db= client.db('TodoAPI');

    db.collection('users').find({ 
        _id: new ObjectID('5ecc1abf99aa012434f53666') 
    }).toArray().then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    //client.close();
});