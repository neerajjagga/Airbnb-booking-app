const express = require('express');
const { connectDB } = require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { userRouter } = require('./routes/user.routes');
const { placeRouter } = require('./routes/place.route');
const { bookingRouter } = require('./routes/booking.route');

app.use('/api/user', userRouter);
app.use('/api/places', placeRouter);
app.use('/api/bookings', bookingRouter);

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

