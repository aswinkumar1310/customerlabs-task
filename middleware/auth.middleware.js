const { getAccount } = require('../src/account/account.services');
const auth = async (req, res, next) => {
    const token = req.headers['cl-x-token'];
    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'No token Provided'
        });
    }
    const userCheck = await getAccount({ where: { appSecret: token } });
    if (!userCheck) {
        return res.status(401).json({
            status: false,
            message: 'Unauthorized Access'
        });
    }
    if (!req.is('application/json')) {
        return res.status(415).json({ message: 'Content-Type must be application/json' });
    }

    if (!Object.keys(req.body).length) {
        return res.status(422).json({ message: 'Request body may not be empty.' });
    }
    req.account = { id: userCheck.id, email: userCheck.email, appSecret: token }
    next()
}

module.exports = { auth };