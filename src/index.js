const router = require('express').Router();
router.use('/v' + process.env.VERSION, require('./routes/v' + process.env.VERSION+'/routes'));

module.exports = router;
