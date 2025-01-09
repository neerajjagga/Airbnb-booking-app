const Joi = require('joi');

const validateBookingData = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        phoneNumber: Joi.string().pattern(/^\d{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be a 10-digit number.'
        }),
        checkIn: Joi.date().iso().required().messages({
            'date.format': 'Check-in date must be in ISO format (YYYY-MM-DD).'
        }),
        checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required().messages({
            'date.greater': 'Check-out date must be after check-in date.'
        }),
        numberOfGuests: Joi.number().integer().min(1).max(10).required().messages({
            'number.min': 'Number of guests must be at least 1.',
            'number.max': 'Number of guests cannot exceed 10.'
        }),
        price: Joi.number().required().greater(0).messages({
            'number.greater': 'Price must be greater than 0.'
        }),
        placeId : Joi.string().required()
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
    validateBookingData,
}