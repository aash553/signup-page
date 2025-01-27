const Joi = require("joi");

const signvalidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.details.map((err) => err.message),
        });
    }

    next();
};

const loginvalidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.details.map((err) => err.message),
        });
    }

    next();
};

module.exports = {
    signvalidation,
    loginvalidation,
};