const { account: Account, destination: Destination } = require("./account.model")

const createAccount = async (data) => {
    const account = await Account.create(data)
    return account
}

const getAccount = async (options) => {
    const account = await Account.findOne(options)
    return account
}

const updateAccount = async (options, data) => {
    const account = await Account.update(data, options)
    return account
}

const getAccounts = async (options, page, limit) => {
    const [count, data] = await Promise.all([
        Account.count({ where: options }),
        Account.findAll({
            where: options,
            limit: limit,
            offset: (page - 1) * limit,
            order: ['createdAt']
        })
    ])
    return { page: page, limit: limit, totalCount: count, data }
}

const deleteAccount = async (options) => {
    const account = await Account.destroy({ where: options })
    return account
}

const createDestination = async (data) => {
    const account = await Destination.create(data)
    return account
}

const getDestination = async (options) => {
    const account = await Destination.findOne(options)
    return account
}

const updateDestination = async (options, data) => {
    const account = await Destination.update(data, options,)
    return account
}

const getDestinations = async (options, page, limit) => {
    const [count, data] = await Promise.all([
        Destination.count({ where: options }),
        Destination.findAll({
            where: options,
            limit: limit,
            offset: (page - 1) * limit,
            order: ['createdAt']
        })
    ])
    return { page: page, limit: limit, totalCount: count, data }
}

const deleteDestination = async (options) => {
    const destination = await Destination.destroy({ where: options })
    return destination
}

const destinationList = async (options) => {
    const destinations = await Destination.findAll({
        where: options,
        order: ['createdAt'],
        raw: true
    })
    return destinations
}
module.exports = {
    createAccount,
    getAccount,
    updateAccount,
    getAccounts,
    createDestination,
    getDestination,
    updateDestination,
    getDestinations,
    deleteDestination,
    deleteAccount,
    destinationList
}