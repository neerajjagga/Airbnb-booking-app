const { Booking } = require('../models/booking.model');

const addNewBooking = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {placeId, checkIn, checkOut} = req.body;

        // find if the booking is already axists 

        const isBookingAlreadyExists = await Booking.findOne({
            customerId : loggedInUser._id,
            placeId,
            checkIn,
            checkOut,
        })

        if(isBookingAlreadyExists) {
            return res.status(400).json({
                success : false,
                message : "A booking is already exists with the current selected dates"
            })
        }

        const newBooking = await Booking.create({ ...req.body, customerId: loggedInUser._id });

        res.status(200).json({
            success: true,
            message: "Booked successfully",
            booking: newBooking
        })

    } catch (error) {
        console.log("Error coming while booking a place" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getMyBookings = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const BOOKING_SAFE_DATA = 'checkIn checkOut numberOfGuests price placeId'

        // find bookings where loggedInUser._id is the customerId

        const myBookings = await Booking
            .find({ customerId: loggedInUser._id })
            .select(BOOKING_SAFE_DATA)
            .populate('placeId', 'title description address photos')
            .lean()

        if (myBookings.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No bookings found",
                bookings: []
            })
        }

        return res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            bookings: myBookings,
        })

    } catch (error) {
        console.log("Error coming while fetching user bookings" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const cancelBooking = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { bookingId } = req.body;

        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "BookingID is required"
            })
        }

        //  find booking id and validate customer id
        const booking = await Booking.findOne({
            $and: [
                { _id: bookingId },
                { customerId: loggedInUser._id },
            ]
        })

        if (!booking) {
            return res.status(400).json({
                success: false,
                message: "Booking not found"
            })
        }

        await booking.deleteOne();

        const myCurrentBookings = await getMyBookingsUtility(loggedInUser._id);

        res.status(200).json({
            success: true,
            message: "Booking cancelled",
            myBookings: myCurrentBookings
        })

    } catch (error) {
        console.log("Error coming while cancel booking" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getMyBookingsUtility = async (userId) => {

    const BOOKING_SAFE_DATA = 'checkIn checkOut numberOfGuests price placeId'

    const myBookings = await Booking
        .find({ customerId: userId })
        .select(BOOKING_SAFE_DATA)
        .populate('placeId', 'title description address photos')
        .lean()

    return myBookings;
}

module.exports = {
    addNewBooking,
    getMyBookings,
    cancelBooking,
}