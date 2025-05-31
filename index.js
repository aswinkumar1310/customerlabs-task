const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const APP_STATE = process.env.NODE_ENV;
const helmet = require('helmet');
const app = express();
const { auth } = require("./middleware/auth.middleware");
const { dataPusher } = require('./src/account/account.controller');
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ limit: 52428800, extended: true }));
app.options('*', cors());
app.use(cors());

// protect against vulnerability
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            'img-src': ["'self'", 'https: data:'],
        },
    }),
);

/**
 * routes application
 */

app.use('/api', require('./src'));

app.post("/server/incoming_data", auth, dataPusher)
app.get('*', (req, res) => {
    res.send({
        title: 'Backend API',
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    const isProduction = APP_STATE === 'production';
    res.status(err.status || 500).json({
        statusCode: 500,
        status: false,
        message: 'Error Occured!',
        data: err.message === "File too large" ? "File Max limit is 5 MB" : err.message,
        ...(isProduction ? {} : { error: err }),
    });
});

module.exports = app;
