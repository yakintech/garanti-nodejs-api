const Joi = require('joi');

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required().messages({
        'any.required': 'İsim boş geçilemez'
    }),
    lastName: Joi.string()
});


module.exports = {
    createUserSchema
}