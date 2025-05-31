const { destinationCalls } = require("../../services/axios.services");
const { sendResponse, errorHandler, } = require("../../utils/common_functions");
const { account } = require("./account.model");
const appService = require("./account.services");
const { Op } = require("sequelize")
const createAccount = async (req, res) => {
    try {
        const { body: data } = req;
        const checkEmail = await appService.getAccount({
            where: {
                email: data.email
            },
            raw: true
        });
        if (checkEmail) {
            return sendResponse(res, false, 200, "Email already exists.");
        }
        await appService.createAccount(data);
        return sendResponse(res, true, 200, "Account created successfully.");
    } catch (err) {
        return errorHandler(err, res);
    }
}

const getAccounts = async (req, res) => {
    try {
        const { query: { page, limit } } = req
        const accounts = await appService.getAccounts({}, Number(page), Number(limit))
        return sendResponse(res, true, 200, "Accounts available.", accounts);
    } catch (err) {
        return errorHandler(err, res);
    }
}

const updateAccount = async (req, res) => {
    try {
        const { body: data, params: { id } } = req
        const checkEmail = await appService.getAccount({
            where: {
                email: data.email,
                id: { [Op.ne]: id }
            },
            raw: true
        });
        if (checkEmail) {
            return sendResponse(res, false, 200, "Email already exists.");
        }
        await appService.updateAccount({ where: { id: id } }, data)
        return sendResponse(res, true, 200, "Account updated.");
    } catch (err) {
        return errorHandler(err, res);
    }
}
const deleteAccount = async (req, res) => {
    try {
        const { params: { id } } = req
        const checkAccount = await appService.getAccount({
            where: { id: id },
            raw: true
        });
        if (!checkAccount) {
            return sendResponse(res, false, 200, "Account not found.");
        }
        await appService.deleteAccount({ id: id })
        return sendResponse(res, true, 200, "Account and its destinations deleted.");
    } catch (err) {
        return errorHandler(err, res);
    }
}

const createDestination = async (req, res) => {
    try {
        const { body: data } = req;
        const checkDestination = await appService.getDestination({
            where: {
                url: data.url,
                method: data.method,
                accountId: data.accountId
            },
            raw: true
        });
        if (checkDestination) {
            return sendResponse(res, false, 200, "Destination already exists.");
        }
        await appService.createDestination(data);
        return sendResponse(res, true, 200, "Destination created successfully.");
    } catch (err) {
        return errorHandler(err, res);
    }
}

const getDestinations = async (req, res) => {
    try {
        const { query: { page, limit, accountId } } = req;
        const options = {};
        if (accountId) {
            options.accountId = accountId
        }
        const accounts = await appService.getDestinations(options, Number(page), Number(limit))
        return sendResponse(res, true, 200, "Destinations available.", accounts);
    } catch (err) {
        return errorHandler(err, res);
    }
}

const updateDestination = async (req, res) => {
    try {
        const { body: data, params: { id } } = req
        const checkDestination = await appService.getDestination({
            where: {
                url: data.url,
                method: data.method,
                accountId: data.accountId,
                id: { [Op.ne]: id }
            },
            raw: true
        });
        if (checkDestination) {
            return sendResponse(res, false, 200, "Destination already exists.");
        }
        await appService.updateDestination({ where: { id: id } }, data)
        return sendResponse(res, true, 200, "Destinations updated.");
    } catch (err) {
        return errorHandler(err, res);
    }
}

const deleteDestintion = async (req, res) => {
    try {
        const { params: { id } } = req
        const checkDestination = await appService.getDestination({
            where: { id: id },
            raw: true
        });
        if (!checkDestination) {
            return sendResponse(res, false, 200, "Destination not found.");
        }
        await appService.deleteDestination({ id: id })
        return sendResponse(res, true, 200, "Destination deleted.");
    } catch (err) {
        return errorHandler(err, res);
    }
}

const dataPusher = async (req, res) => {
    try {
        const { account, body: data } = req;
        const desitnations = await appService.destinationList({ accountId: account.id })
        if (!desitnations.length) {
            return sendResponse(res, false, 200, "Destination not available.",);
        }
        const responses = await destinationCalls(desitnations, data, account);
        return sendResponse(res, true, 200, "Destination redirected.", responses);
    } catch (err) {
        return errorHandler(err, res);
    }
}

module.exports = {
    createAccount,
    getAccounts,
    updateAccount,
    createDestination,
    getDestinations,
    updateDestination,
    deleteDestintion,
    deleteAccount,
    dataPusher
}