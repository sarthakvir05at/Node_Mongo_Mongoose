const {MongoClient, ObjectID}= require('mongodb');
var obj= new ObjectID();
 
MongoClient.connect('mongodb://localhost:27017/TodoAPI', (err, client) => {
    if(err)
    return console.log('Unable To Connect To MongoDB Server');
    console.log('Connected TO MongoDb Server');
    const db= client.db('TodoAPI');

    // To Update we use findOneAndUpdate() which has 4 arguments, first is filter which means which document we wanna uptdate to,
    // second is the update operators which helps to update things in diff manner and third is the option which involves certain 
    // settings, in our case we use returnOriginal which returns updated data if set to false and fourth being the callback/promise
    db.collection('users').findOneAndUpdate({
        _id: new ObjectID('5ecc20772e69bc05ac7dfeaa')
    }, {
        $set: {
            name: 'Yogesh Thorat'
        }, $inc: {
            age: 5
        }
    }, {
        returnOriginal: false
    }).then((results) => {
        console.log(results);
    }, (err) => {
        console.log(err);
    })

   // client.close();
   })