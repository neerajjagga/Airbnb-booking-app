const mongoose = require('mongoose');

const placeSchema = mongoose.model({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    subtitle : {
        type : String,
    },
    description : {
        type : String,
        maxLength : 200,      
    },
    perks : {
        type : [String]
    },
    extraInfo : {
        type : String,
    },
    checkIn : {
        type : Number
    },
    checkOut : {
        Number,
    },
    maxGuests : {
        type : Number,
    }
}, {
    timestamps : true
})

const Place = mongoose.model('Place', placeSchema);

module.exports = {
    Place,
}



