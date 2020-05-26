var mongoose= require('mongoose');

mongoose.Promise= global.Promise;

const URI= 'mongodb+srv://sarthak15:sarthak15@initialdb-970k5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI || 'mongodb://localhost:27017/TodoAPI', { useUnifiedTopology: true,  useNewUrlParser: true });

module.exports= { mongoose }