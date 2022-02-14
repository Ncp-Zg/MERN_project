const mongoose = require("mongoose");
const User = require("../backend/Models/userModel");



const connectDB = async () => {
    try {
        const con = await mongoose.connect(, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        console.log(`MongoDB Connected : ${con.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit();
        
    }
};

module.exports = connectDB