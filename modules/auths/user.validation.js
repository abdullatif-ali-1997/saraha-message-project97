const joi = require("joi")

const signUpValidator = {
    body: joi.object().required().keys({
        name: joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)).messages({
            'string.empty': 'please fill in your name',
            'string.pattern.base': 'please enter valid name char',
            'string.required': 'name is required'
        }),
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword: joi.string().valid(joi.ref('password')).required(),
        phone: joi.number().required()
    })
}
const signInValidator = {
    body: joi.object().required().keys({
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    })
}

const updateValidator = {
    body: joi.object().required().keys({
        name: joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)).messages({
            'string.empty': 'please fill in your name',
            'string.pattern.base': 'please enter valid name char',
            'string.required': 'name is required'
        }),
    })
}
const idValidator = {
    params: joi.object().required().keys({
        id: joi.string().required().max(24)
    })
}
module.exports = { signUpValidator, signInValidator, updateValidator, idValidator }