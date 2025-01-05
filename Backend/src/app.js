const express = require('express');
const { connectDB } = require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}));
app.use(cookieParser());

const { userRouter } = require('./routes/user.routes');

app.use('/api/user', userRouter);

connectDB()
    .then(() => {
        console.log("DB connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error coming while connecting to DB" + error);
    })

