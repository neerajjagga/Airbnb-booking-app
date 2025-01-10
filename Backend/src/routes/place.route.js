const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const { uploadImageByLink, 
    uploadPhotos, 
    addNewPlace,
    getMyPlaces, 
    getPlace,
    getAllPlaces,
    getFilteredPlaces
} = require('../controllers/place.controller');
const {validateNewPlaceData} = require('../validators/place.validation');
const multer = require('multer');


const placeRouter = express.Router();

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './src/uploads');
    },
    filename : function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage })


placeRouter.post('/upload-image-by-link', userAuth, uploadImageByLink)
placeRouter.post('/upload-photos', userAuth, upload.array('photos', 15), uploadPhotos)
placeRouter.post('/new', userAuth, validateNewPlaceData, addNewPlace)
placeRouter.get('/my-places', userAuth, getMyPlaces);
placeRouter.get('/all', userAuth, getAllPlaces);
placeRouter.post('/s', userAuth, getFilteredPlaces);
placeRouter.get('/:placeId', userAuth, getPlace);

module.exports = {
    placeRouter
}