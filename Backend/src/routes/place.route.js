const express = require('express');
const {userAuth} = require('../middlewares/userAuth');
const {uploadImageByLink} = require('../controllers/place.controller');
const placeRouter = express.Router();

placeRouter.post('/upload-image-by-link', userAuth, uploadImageByLink)

module.exports = {
    placeRouter
}