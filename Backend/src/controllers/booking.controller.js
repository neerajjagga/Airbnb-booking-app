const { Booking } = require('../models/booking.model');

const addNewBooking = async (req, res) => {
    try {
        const loggedInUser = req.user;

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
            .find({customerId : loggedInUser._id})
            .select(BOOKING_SAFE_DATA)
            .populate('placeId', 'title description address photos')
            .lean()

        if(!myBookings) {
            return res.status(200).json({
                success : false,
                message : "No bookings found",
                bookings : []
            })
        }

        res.status(200).json({
            success : true,
            message : "Bookings fetched successfully",
            bookings : myBookings,
        })

    } catch (error) {
        console.log("Error coming while fetching user bookings" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const cancelBooking = async(req, res) => {
    try {
        const loggedInUser = req.user;
        const {bookingId} = req.body;

        if(!bookingId) {
            return res.status(400).json({
                success : false,
                message : "BookingID is required"
            })
        }

        //  find booking id and validate customer id
        const booking = await Booking.findOne({
            $and : [
                {_id : bookingId},
                {customerId : loggedInUser._id},
            ]
        })
        console.log(booking);
        

        if(!booking) {
            return res.status(400).json({
                success : false,
                message : "Booking not found"
            })
        }

        // fetch my latest bookings also
        const myCurrentBookings = await getMyBookings(req, res);

        res.status(200).json({
            success : true,
            message : "Booking cancelled",
            bookings : myCurrentBookings
        })

    } catch (error) {
        console.log("Error coming while cancel booking" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

module.exports = {
    addNewBooking,
    getMyBookings,
    cancelBooking,
}