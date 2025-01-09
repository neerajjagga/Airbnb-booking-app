const { string } = require('joi');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true, 
    },
    phoneNumber : {
        type : String,
        required : true
    },
    checkIn : {
        type : String,
        required : true,
    },
    checkOut : {
        type : String,
        required : true,
    },
    numberOfGuests : {
        type : String,
        required : true,      
    },
    price : {
      type : Number,
      required : true,  
    },
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    placeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Place',
        required : true,
    }
}, 
{
    timestamps : true,
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {
    Booking,
}