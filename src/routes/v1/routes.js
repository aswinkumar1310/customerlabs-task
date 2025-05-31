const router = require('express').Router();
const accountRoute = require('../../account/account.routes');
router.use('/account', accountRoute);
module.exports = router;