const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('Se ha conectado a base de datos'))

async function connectDB ({ admin, pass, dbname }) {
    const uri = `mongodb+srv://${admin}:${pass}@cluster0.d6ozq.mongodb.net/${dbname}?retryWrites=true&w=majority`;
    await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
}

module.exports = connectDB;