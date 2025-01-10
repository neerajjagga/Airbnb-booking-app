const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_secret_key = process.env.JWT_SECRET_KEY;

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please log in."
            })
        }

        let decodedObj;
        try {
            decodedObj = jwt.verify(token, jwt_secret_key);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message : "Session expired or invalid. Please log in again.",
            });
        }

        const { _id } = decodedObj;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Invalid session. Please log in again.",
            });
        }

        // find user with this id first
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please log in again.",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error during authentication:" + error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred. Please try again later.",
        });
    }
}

module.exports = {
    userAuth
}
