const {MongoClient, ObjectID}= require('mongodb');
var obj= new ObjectID();
 
MongoClient.connect('mongodb://localhost:27017/TodoAPI', (err, client) => {
    if(err)
    return console.log('Unable To Connect To MongoDB Server');
    console.log('Connected TO MongoDb Server');
    const db= client.db('TodoAPI');

    //Three Methods To Delete Document: 1) deleteMany 2) deleteOne 3) findOneAndDelete(best)
    //deleteMany
    // db.collection('users').deleteMany({ age: 21}).then((result)=> {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable To Delete', err);
    //     });
    
        //deleteOne
        // db.collection('Todos').deleteOne({ text: 'Eat Lunch'}).then((result)=> {
        //     console.log(result);
        // }, (err) => {
        //     console.log('Unable To Delete', err);
        //     });

       // findOneAndDelete 
        // db.collection('users').findOneAndDelete({ age:20 }).then((result) => {
        //     console.log(result);
        // }, (err) => {
        //     console.log('Unable To Delete', err);
        // })

   // client.close();
   })