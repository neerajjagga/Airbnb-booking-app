const mongoose = require('mongoose');
require('dotenv').config();

const db_url = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(db_url);
    } catch (error) {
        console.log("Error coming while connecting to DB" + error.message);
    }
}

module.exports = {
    connectDB
}
