const express = require('express');
const {
    registerUser, 
    loginUser, 
    logoutUser, 
    checkAuth,
    updateUser
} = require('../controllers/user.controller');
const {validateRegisterUserData, validateLoginUserData} = require('../validators/user.validation');
const {userAuth} = require('../middlewares/userAuth');
const userRouter = express.Router();

userRouter.post('/register', validateRegisterUserData, registerUser);
userRouter.post('/login', validateLoginUserData, loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/checkAuth', userAuth, checkAuth);
userRouter.post('/edit', userAuth, updateUser);

module.exports = {
    userRouter
};
