const mongoose = require('mongoose');

module.exports.connection = () => {
    mongoose.connect(process.env.MONGODB_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(() => console.log("MongoDB Connection Succesfully run!"))
        .catch((err) => console.log("MongoDb Connection Failed"));
}