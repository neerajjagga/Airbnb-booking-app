const imageDownloader = require('image-downloader');

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
                    message : "Image added successfully",
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

module.exports = {
    uploadImageByLink
}
