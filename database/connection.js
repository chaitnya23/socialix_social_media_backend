
const mongoose = require('mongoose')


const database = "mongodb+srv://chaitnya_giri:chaitnya2306@mycluster.osnnc.mongodb.net/socialix_db?retryWrites=true&w=majority";
const dbConnection = async()=>{

    
    mongoose.connect(`${database}`)
    .then(() => console.log("Database succesfully connected with server..."))
    .catch((err) => console.log(err));
}

module.exports = dbConnection;