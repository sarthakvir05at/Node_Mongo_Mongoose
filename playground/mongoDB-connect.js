const MongoClient= require('mongodb').MongoClient;

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

    // client.close();
});