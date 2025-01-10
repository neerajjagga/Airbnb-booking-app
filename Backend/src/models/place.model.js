const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        maxLength : 1000,      
    },
    address : {
        type : String,
    },
    price : {
        type : Number,
    },
    perks : {
        type : [String]
    },
    photos : {
        type : [String],
    },
    extraInfo : {
        type : String,
    },
    checkIn : {
        type : String,
    },
    checkOut : {
        type : String,
    },
    maxGuests : {
        type : Number,
    }
}, {
    timestamps : true
})

const Place = mongoose.model('Place', placeSchema);

placeSchema.set('toJSON', {
    transform : function(doc, ret) {
        delete ret.updatedAt
        delete ret.owner
        delete ret.__v
    } 
})

module.exports = {
    Place,
}



