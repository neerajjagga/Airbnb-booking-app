
const Joi = require('joi');

const validateRegisterUserData = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ 
            success : false,
            message: error.details[0].message 
        });
    }

    next(); 
};

const validateLoginUserData = (req, res, next) => {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(20).required(),
    });

    const { error } = schema.validate(req.body);

    if(error) {
        return res.status(400).json({
            success : false,
            message : error.details[0].message,
        });
    }

    next();
}

module.exports = {
    validateRegisterUserData,
    validateLoginUserData,
}
