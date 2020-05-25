const MongoClient= require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoAPI', { useUnifiedTopology: true }, (err, client) => {
    if(err)
    return console.log('Unable To Connect');

    console.log('Conneced To Database');

    client.close();
});