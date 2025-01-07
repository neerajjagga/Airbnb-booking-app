const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if not user is present with this email
        const isUserAlreadyPresent = await User.findOne({ email });

        if (isUserAlreadyPresent) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered. Please log in or use a different email."
            })
        }

        // bcrypt password
        const hassedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hassedPassword,
        })

        await user.save();

        // set cookie
        const token = user.getAccessToken();
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            message: "Account created successfully",
            user: user,
        })

    } catch (error) {
        console.log("Error coming while registring user" + error.message);
        res.status(500).json({
            success: false,
            message: "Couldn't create user, try again later"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if not user is present with this email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        // bcrypt password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        // set cookie
        const token = user.getAccessToken();
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
        });

        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse._id;

        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: user
        })

    } catch (error) {
        console.log("Error coming while registring user" + error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are already logged out",
            })
        }

        // otherwise clear cookie
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            message: "Successfully logged out",
        })

    } catch (error) {
        console.log("Error coming while logout user" + error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        const loggedInUser = req.user;
        return res.status(200).json({
            success: true,
            user: loggedInUser,
        })
    } catch (error) {
        console.log("Error coming while checkAuth" + error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
}