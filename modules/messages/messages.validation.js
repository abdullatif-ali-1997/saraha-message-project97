const joi = require("joi");

const messageValidator = {
    body: joi.object().required().keys({
        messageContent: joi.string().required().min(5).max(200)
    }),
    params: joi.object().required().keys({
        id: joi.string().required().min(24).max(24)
    })
}


module.exports = {messageValidator}