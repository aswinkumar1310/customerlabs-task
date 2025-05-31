const Joi = require('joi');

const accountCreation = Joi.object({
    body: Joi.object({
        email: Joi.string().required(),
        accountName: Joi.string().required(),
        website: Joi.string().optional()
    })
}).unknown(true);

const getAccounts = Joi.object({
    query: Joi.object({
        page: Joi.number().required(),
        limit: Joi.number().required(),
        accountId: Joi.number().optional()
    })
}).unknown(true);

const editAccount = Joi.object({
    params: Joi.object({
        id: Joi.number().required(),
    }),
    body: Joi.object({
        email: Joi.string().optional(),
        accountName: Joi.string().optional(),
        website: Joi.string().optional()
    })
}).unknown(true);

const destinationCreation = Joi.object({
    body: Joi.object({
        url: Joi.string().required(),
        method: Joi.string().required(),
        accountId: Joi.number().required(),
        headers: Joi.object().pattern(Joi.string(), Joi.string()).required()
    })
}).unknown(true);

const destinationEdit = Joi.object({
    params: Joi.object({
        id: Joi.number().required(),
    }),
    body: Joi.object({
        url: Joi.string().required(),
        method: Joi.string().required(),
        accountId: Joi.number().required(),
        headers: Joi.object().pattern(Joi.string(), Joi.string()).required()
    })
}).unknown(true);

const deleteSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().required(),
    })
}).unknown(true);
module.exports = {
    accountCreation,
    getAccounts,
    editAccount,
    destinationCreation,
    destinationEdit,
    deleteSchema
}