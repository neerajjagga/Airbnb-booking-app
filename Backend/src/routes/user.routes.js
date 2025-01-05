const express = require('express');
const {registerUser, loginUser, logoutUser} = require('../controllers/user.controller');
const {validateRegisterUserData, validateLoginUserData} = require('../validators/user.validation');
const userRouter = express.Router();

userRouter.post('/register', validateRegisterUserData, registerUser);
userRouter.post('/login', validateLoginUserData, loginUser);
userRouter.post('/logout', logoutUser);

module.exports = {
    userRouter
};
