const Joi = require('joi');

const validateNewPlaceData = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(100).required()
            .messages({ 'string.empty': 'Title is required' }),

        subtitle: Joi.string().trim().max(100).default(''),

        address: Joi.string().trim().min(5).max(200).required()
            .messages({ 'string.empty': 'Address is required' }),

        description: Joi.string().trim().max(1000)
            .messages({ 'string.max': 'Description should not exceed 500 characters' }),

        price : Joi.number().required(),

        extraInfo: Joi.string().trim().max(300),

        photos: Joi.array().items(Joi.string().trim())
            .messages({ 'string.uri': 'Photos must be valid image URLs' }),

        perks: Joi.array().items(Joi.string().trim()).min(1)
            .messages({ 'array.min': 'At least one perk is required' }),

        checkIn: Joi.string().trim().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .messages({ 'string.pattern.base': 'Check-in time must be in HH:mm format' }),

        checkOut: Joi.string().trim().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .messages({ 'string.pattern.base': 'Check-out time must be in HH:mm format' }),

        maxGuests: Joi.number().integer().min(1).max(50).required()
            .messages({ 'number.min': 'At least 1 guest is required', 'number.max': 'Maximum guests allowed is 50' })
    });

    const { error } = schema.validate(req.body, { abortEarly : false });

    if (error) {
        return res.status(400).json({ 
            success : false,
            message: error.details[0].message 
        });
    }
    next();
}

module.exports = {
    validateNewPlaceData,
}

