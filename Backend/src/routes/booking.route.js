const express = require('express');
const {
    addNewBooking, 
    getMyBookings,
    cancelBooking,
} = require('../controllers/booking.controller');
const {userAuth} = require('../middlewares/userAuth');
const {validateBookingData} = require('../validators/booking.validation');
const bookingRouter = express.Router();

bookingRouter.post('/new', userAuth, validateBookingData, addNewBooking );
bookingRouter.get('/me', userAuth, getMyBookings );
bookingRouter.post('/cancel', userAuth, cancelBooking );


module.exports = {
    bookingRouter
};
