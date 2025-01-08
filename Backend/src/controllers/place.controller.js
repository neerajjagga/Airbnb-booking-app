const imageDownloader = require('image-downloader');
const { Place } = require('../models/place.model');

const uploadImageByLink = async (req, res) => {
    try {
        const { link } = req.body;
        if (!link) {
            return res.status(400).json({
                success: false,
                message: "Image link is required",
            })
        }

        const newName = 'photo' + Date.now() + '.jpg';

        imageDownloader.image({
            url: link,
            dest: __dirname + '/../uploads/' + newName,
        })
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: "Image added successfully",
                    filename: newName,
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                })
            })
    } catch (error) {
        console.log("Error coming while uploading image by link" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const uploadPhotos = async (req, res) => {
    try {
        res.json(req.files);
    } catch (error) {
        console.log("Error coming while uploading image by link" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const addNewPlace = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const newPlace = await Place.create({ ...req.body, owner: loggedInUser._id });

        res.status(200).json({
            success: true,
            message: "Accomodation added successfully",
            place: newPlace,
        })

    } catch (error) {
        console.log("Error coming while uploading image by link" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getMyPlaces = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const myPlaces = await Place.find({ owner: loggedInUser._id })

        if (!myPlaces) {
            return res.status(200).json({
                success: true,
                message: "You have no accomodations yet"
            })
        }

        res.status(200).json({
            success: true,
            myPlaces: myPlaces,
        })

    } catch (error) {
        console.log("Error coming while uploading image by link" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getPlace = async (req, res) => {
    try {
        const { placeId } = req.params;

        if(!placeId) {
            return res.status(400).json({
                success : false,
                message : "PlaceID is required",
            })
        }



        // find the place
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({
                success: false,
                message: "Place not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Place fetched successfully",
            place,
        })
    } catch (error) {
        console.log("Error coming while uploading image by link" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

const getAllPlaces = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const allPlaces = await Place.find({ owner: { $ne: loggedInUser._id } })
            .populate('owner', 'name email -_id')
            .lean()  

        return res.status(200).json({
            success: true,
            allPlaces,
        })

    } catch (error) {
        console.log("Error coming while uploading image by link" + error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        })
    }
}

module.exports = {
    uploadImageByLink,
    uploadPhotos,
    addNewPlace,
    getMyPlaces,
    getPlace,
    getAllPlaces,
}
