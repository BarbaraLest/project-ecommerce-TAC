const mongoose = require("mongoose");

const connectDatabase = () =>{
    mongoose.connect(process.env.MONGO_URL).then((data) => {

        console.log(`MongoDB connected with server: ${data.connection.host}`);
    
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDatabase