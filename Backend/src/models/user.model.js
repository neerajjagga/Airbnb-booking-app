const { Schema, model } = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_secret_key = process.env.JWT_SECRET_KEY;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must not exceed 50 characters'], 
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Invalid email format",
        }
    },
    password : {
        type : String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    }
});

userSchema.methods.getAccessToken = function () {
    const user = this;
    return jwt.sign(
        {_id : user._id.toString()}, 
        jwt_secret_key,
        {
            expiresIn : '7D',
        }
    )
}

userSchema.set('toJSON', {
    transform : function(doc, ret) {
        delete ret.password;
        delete ret._id;
        return ret;
    }
})

const User = model('User', userSchema);

module.exports = {
    User
}